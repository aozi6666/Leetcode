// 创建一个“带防抖 + 竞态处理 + 中断旧请求”的搜索函数
// fetch 请求回调
// 两层竞态保护:  AbortController + latestId 
function createDebouncedFetch(delay = 300) {
  let timer = null;
  let controller = null;

  // 异步请求回调
  function fetchData(value){
    return fetch(`/api/search?query=${encodeURIComponent(value)}`, {
      method: 'GET',
    }).then((res) => {
      if(!res.ok) {
        throw new Error('Network response was not ok.')
      }
      return res.json();
    })
  }

  // 返回一个函数
  return function search(value, onSuccess, onError){
    // 清除上次的定时器
    clearTimeout();

    // 空值处理
    if(!value || !value.trim()){
      onSuccess([]);
      return;
    }

    // 创建定时器
    const timer = setTimeout(() => {
      // 发请求(异步)
      fetchData(value)
        .then((res) => {
          onSuccess(res);
        })
        .catch((err) => {
          console.error();
        })
    }, delay);
  }
    
}
  