// 创建一个“带防抖 + 竞态处理 + 中断旧请求”的搜索函数
// fetch 请求回调
// 两层竞态保护:  AbortController + latestId 
import { json } from "stream/consumers";
import AbortController from 
function createDebouncedFetch(delay = 300) {
  let timer = null;
  
  let controller = null;
  let latesId = 0;

  function fetchData(value, options = {}) {
    fetch(`/api/search?queery=${encodeURLComponent(value)}`, {
      method: 'GET',
      options: signal
    }).then((res) => {
      if(!res.ok){
        throw new Error("网路异常")
      }
      return res.json();
    })
  }

  return function search(value, onSucess, onError){
    clearTimeout();

    if(controller) {
      controller.abort();
    }

    // 空值判断
    if(!value || !value.trim()){
      onSucess([]);
      return;
    }

    let controller = new AbortController()

    // 开启定时器
    const timer = setTimeout(() => {
      let id = ++latesId;

      fetchData(value, {signal: controller.signal})
        .then((res) => {
          if(id === latesId) {
            onSucess(res)
          }
        })
        .catch((err) => {
          if(err.name !== 'AbortError'){
            onError(err);
          } else {
            console.error(err);
          }
        })
    }, delay);
  }
    
}
  