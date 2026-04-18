// 创建一个“带防抖 + 竞态处理 + 中断旧请求”的搜索函数
// fetch 请求回调
// 两层竞态保护:  AbortController + latestId 
function createDebouncedFetch(delay = 300) {
    let timer = null;
    let controller = null;
    let latestId = 0;
  
    // 真正发请求的方法（只写 fetch 版本）
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
      // 先清掉上一次定时器
      clearTimeout(timer);
  
      // 中断上一次请求
      if (controller) {
        controller.abort();
      }
  
      // 空值直接处理
      if (!value || !value.trim()) {
        onSuccess([]);
        return;
      }
  
      // 为本次请求创建新的 controller
      controller = new AbortController();
  
      timer = setTimeout(() => {
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
      }, delay);
    };
  }
  