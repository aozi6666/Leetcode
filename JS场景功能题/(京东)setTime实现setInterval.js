/*
setInterval(() => {
  console.log("重复执行");
}, 1000);

通过 setTimeout 递归调用来实现 setInterval 的“重复执行”效果
*/

const timerMap = {};
let timerId = 0;

function mySetInterval(callback, delay) {
  // 1. 生成一个“模拟的定时器 id”
  const id = ++timerId;

  // 2. 定义递归函数
  function run() {
    timerMap[id] = setTimeout(() => {
      callback();

      // 如果这个 id 还没被清除，就继续下一轮
      if (timerMap[id]) {
        run();
      }
    }, delay);
  }

  // 3. 开启第一轮
  run();

  // 4. 返回“模拟的定时器 id”
  return id;
}

function myClearInterval(id) {
  clearTimeout(timerMap[id]);
  delete timerMap[id];
}


// 例子
const id = mySetInterval(() => {
    console.log("hello");
  }, 1000);

// 清除定时器
myClearInterval(id);


