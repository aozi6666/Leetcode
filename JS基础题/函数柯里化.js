/* 
    函数柯里化，：把一个原本需要传多个参数的函数，拆成多次传参的函数
    柯里化的作用: 参数复用、提前返回、延迟执行，
                让函数职责更单一，方便封装通用逻辑
    实现上: 通过闭包不断收集参数，当参数数量达到原函数形参数量时，再执行原函数。
*/
function curry(fn) {
    // 返回一个新函数，用来接收后续参数
    return function curried(...args) {
      // 如果当前收集到的参数个数已经够了 fn.length === 原函数形参的个数
      if (args.length >= fn.length) {
        // 直接执行原函数
        return fn.apply(this, args);
      }
  
      // 参数不够，就继续返回一个函数收集参数
      return function (...nextArgs) {
        // 把上一次的参数和这一次的参数合并起来
        return curried.apply(this, args.concat(nextArgs));
      };
    };
  }
  
  function add(a, b, c) {
    return a + b + c;
  }
  
  const curriedAdd = curry(add);
  
  console.log(curriedAdd(1)(2)(3));  // 6
  console.log(curriedAdd(1, 2)(3));  // 6
  console.log(curriedAdd(1)(2, 3));  // 6
  