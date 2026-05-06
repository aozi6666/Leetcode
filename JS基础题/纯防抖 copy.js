function debounce(fn, delay = 300){
  // 定义一个计时器
  let timer = null;
  // 定义 最新时间
  let latestId = 0;

  // 返回函数
  return function(...args){
    // 清除定时器
    clearTimeout(timer);

    // 获取本次的id
    const id = ++latestId;
    
    // 开启定时器
    timer = setTimeout(() => {
      fn.apply(this, [...args, id, latestId]);
    }, delay);
  }
}

// 使用方法
const reslut = debounce((value, id, latestId) => {
  fetch(`api/search?query=${encodeURIComponent(value)}`)
    .then((res) => {
      if(id === latestId){
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    })
}, 300);