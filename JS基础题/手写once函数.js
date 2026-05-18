// Once(): 传入 函数参数 只执行一次
// 核心就是：闭包保存一个标记变量，判断函数有没有执行过
function once(fn) {
    // 标记变量：记录函数是否执行过
    var called = false;
    var result;
  
    return function() {
      if (!called) {
        called = true;
        result = fn.apply(this, arguments);
      }
  
      return result;
    };
  }


function add(a, b) {
    console.log("执行了");
    return a + b;
}
  
const onceAdd = once(add);
  
console.log(onceAdd(1, 2)); // 执行了 3
console.log(onceAdd(3, 4)); // 3
console.log(onceAdd(5, 6)); // 3
