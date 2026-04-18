let timer = null;
let controller = null;
let latestId = 0;
let lastTime = 0;

// fetch 请求回调
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

// 节流搜索函数
function throttledSearch(value, onSuccess, onError, delay = 300) {
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

  // 到了节流时间，立即执行
  if (now - lastTime >= delay) {
    lastTime = now;

    if (controller) {
      controller.abort();
    }

    controller = new AbortController();
    const id = ++latestId;

    fetchData(value, { signal: controller.signal })
      .then((res) => {
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

  // 还没到时间，注册尾触发
  clearTimeout(timer);

  timer = setTimeout(() => {
    lastTime = Date.now();

    if (controller) {
      controller.abort();
    }

    controller = new AbortController();
    const id = ++latestId;

    fetchData(value, { signal: controller.signal })
      .then((res) => {
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
}
