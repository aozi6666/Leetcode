// 创建一个“带节流 + 竞态处理 + 中断旧请求”的搜索函数
// fetch 请求回调
// 两层竞态保护: AbortController + latestId

function createThrottledFetch(delay) {
  let timer = null;
  let controller = null;
  let latestId = 0;
  let lastTime = 0;

  return function search(value, onSuccess, onError){
    const now = Date.now();

    // 空值处理
    if(!value || !value.trim()){
      onSuccess([]);
      return;
    }
  }
}