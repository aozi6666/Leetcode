function throttle(fn, delay = 300){
  let lastTime = 0;
  let timer = null;
  // 解决竞态
  let latestId = 0;

  return function(...args){
    const now = Date.now();
    // 竞态保护
    const id = ++latestId;

    // 时间戳版本（leading）
    if(now - lastTime >= delay){
      lastTime = now;
      fn.apply(this, [...args, id, latestId]);
    } else {
      // 清空定时器
      clearTimeout(timer);
      // 开启新定时器
      timer = setTimeout(() => {
        lastTime = Date.now();
        fn.apply(this, [...args, id, latestId]);
      }, delay - (now - lastTime));
    }
  }
}

// 使用方法
const result = throttle((value, id, latestId) => {
  fetch(`/api/search?query=${encodeURIComponent(value)}`)
    .then((res) => {
      if(id === latestId){
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    })
}, 300);
