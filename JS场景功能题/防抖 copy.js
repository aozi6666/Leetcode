// 创建一个“带防抖 + 竞态处理 + 中断旧请求”的搜索函数
// fetch 请求回调
// 两层竞态保护:  AbortController + latestId 
function createDebouncedFetch(delay = 300) {
  let timer = null;
  let 

  // 返回
  const timer = setTimeout(() => {
    // 清楚上次定时器
    clearTimeout();

  },delay);
    
}
  