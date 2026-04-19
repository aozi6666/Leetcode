// 创建一个“带节流 + 竞态处理 + 中断旧请求”的搜索函数
// fetch 请求回调
// 两层竞态保护: AbortController + latestId
function createThrottledFetch(delay = 300) {
    let timer = null;
    let controller = null;
    let latestId = 0;
    let lastTime = 0;
  
    // 真正发请求的方法（fetch 版本）
    function fetchData(value, options = {}) {
      return fetch(`/api/search?query=${encodeURIComponent(value)}`, {
        method: "GET",
        signal: options.signal,
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok.");
        }
        return res.json();
      });
    }
  
    // 返回可调用函数
    return function search(value, onSuccess, onError) {
      const now = Date.now();
  
      // 空值直接处理
      if (!value || !value.trim()) {
        clearTimeout(timer);
        if (controller) {
          controller.abort();
        }
        onSuccess([]);
        return;
      }
  
      // 距离上次触发已经超过 delay，立即执行
      if (now - lastTime >= delay) {
        lastTime = now;
  
        // 中断上一次请求
        if (controller) {
          controller.abort();
        }
  
        // 为本次请求创建新的 controller
        controller = new AbortController();
  
        const id = ++latestId;
  
        fetchData(value, { signal: controller.signal })
          .then((res) => {
            // 只有当前请求还是“最新”的，才允许更新结果
            if (id === latestId) {
              onSuccess(res);
            }
          })
          .catch((err) => {
            if (err.name !== "AbortError") {
              if (typeof onError === "function") {
                onError(err);
              } else {
                console.error(err);
              }
            }
          });
  
        return;
      }
  
      // 还没到节流时间，清掉上一次尾触发定时器
      clearTimeout(timer);
  
      // 注册尾触发
      timer = setTimeout(() => {
        lastTime = Date.now();
  
        // 中断上一次请求
        if (controller) {
          controller.abort();
        }
  
        // 为本次请求创建新的 controller
        controller = new AbortController();
  
        const id = ++latestId;
  
        fetchData(value, { signal: controller.signal })
          .then((res) => {
            // 只有当前请求还是“最新”的，才允许更新结果
            if (id === latestId) {
              onSuccess(res);
            }
          })
          .catch((err) => {
            if (err.name !== "AbortError") {
              if (typeof onError === "function") {
                onError(err);
              } else {
                console.error(err);
              }
            }
          });
      }, delay - (now - lastTime));
    };
  }
  