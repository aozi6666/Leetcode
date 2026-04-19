// 创建一个“带防抖 + 竞态处理 + 中断旧请求”的搜索函数
// fetch 请求回调
// 两层竞态保护:  AbortController + latestId 
import { json } from "stream/consumers";
import AbortController from 
function createDebouncedFetch(delay = 300) {
  let timer = null;
  let controller = null;
  let latestId = 0;


  // 请求回调
  function fetchData(value, options = {}){
    fetch((`/api/sreach?qurey=${encodeURIComponent(value)}`), {
      method: 'GET',
      signal: options.signal
    }).then((res) => {
      if(!res.ok){
        throw new Error('网络异常')
      }
      return res.json;
    })
  }

  return function search(value, onSuccess, onError){
    // 请空定时器
    clearTimeout(timer);

    // 中断上次
    if(controller){
      controller.abort();
    }

    // 空值判断
    if(!value || !value.trim()){
      onSuccess([]);
      return;
    }  

    // 创建一个控制器
    let controller = new AbortController();

    // 创建定时器
    const timer = setTimeout(() => {
      const id = ++latestId;
      
      fetchData(value, signal = controller.signal)
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
    }, delay);
  }
    
}
  