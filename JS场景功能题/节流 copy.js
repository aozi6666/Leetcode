// 创建一个“带节流 + 竞态处理 + 中断旧请求”的搜索函数
// fetch 请求回调
// 两层竞态保护: AbortController + latestId

function createThrottledFetch(delay) {
  let timer = null;
  let controller = null;
  let latestId = 0;
  let lastTime = 0;


  // 异步请求回调
  function fetchData(value, options = {}){
    fetch(`api/search?qurey=${encodeURIComponent(value)}`, {
      method: "GET",
      signal: options.signal
    }).then((res) => {
      if(!res.ok){
        throw new Error('网路异常');
      }
      return res.json();
    })
  }

  return function search(value, onSuccess, onError){
    // 记录此次请求时间
    const now = Date.now();

    // 空值处理
    if(!value || !value.trim()){
      clearTimeout(timer);
      if(controller){
        controller.abort();
      }
      onSuccess([]);
      return;
    }

    // 超过节流时间，直接处理
    if(now - lastTime > delay){
      lastTime = now;

      // 中断上次 控制器
      if(controller){
        controller.abort();
      }

      // 创建一个新的 控制器
      const controller = new AbortController();

      const id = ++latestId;

      // 发请求
      fetchData(value, {signal: controller.signal})
        .then((res) => {
          if(id === latestId){
            onSuccess(res);
          }
        })
        .catch((err) => {
          if(err.name !== 'AbortError'){
            console.error(err);
          }
        })

        return;
    }

    // 还没到节流时间，清除上次定时器
    clearTimeout(timer);

    // 开启新的定时器，注意 delay 时间
    const timer = setTimeout(() => {
      lastTime = Date.now();

      // 中断上次请求
      if(controller){
        controller.abort();
      }

      // 新建一个 控制器对象
      const controller = new AbortController();

      const id = ++latestId;

      // 发请求
      fetch((value, {signal: controller.signal}))
        .then((res) => {
          if(id === latestId){
            onSuccess(res);
          }
        })
        .catch((err) => {
          if(err.name !== 'abortError'){
            console.error(err);
          }
        })

    }, delay - (now - lastTime));
    
  }
}