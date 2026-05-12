/* 
    函数柯里化，：把一个原本需要传多个参数的函数，拆成多次传参的函数
    柯里化的作用: 参数复用、提前返回、延迟执行，
                让函数职责更单一，方便封装通用逻辑

    实现上: 通过闭包不断收集参数，当参数数量达到原函数形参数量时，再执行原函数。
*/

// 例子：
/**
 * 函数 checkType
 * @param {String} type
 * @param {Any} value
 * @return {Boolean}
 * 
    Object.prototype.toString.call("hello") // "[object String]"
    Object.prototype.toString.call([])      // "[object Array]"
    Object.prototype.toString.call(123)     // "[object Number]"
    Object.prototype.toString.call({})      // "[object Object]"
    Object.prototype.toString.call(null)    // "[object Null]"

 */
function checkType(type, value) {
    // 把 value 的真实类型，变成一个固定格式的字符串
    return Object.prototype.toString.call(value) === `[object ${type}]`;
}   
checkType.length === 2   // true : 函数.length 函数形参的数量
// 正常用法：
checkType("String", "hello");
checkType("Array", []);
checkType("Number", 123);

// 如果柯里化以后：
// 返回的是函数，参数传递只有一个 
const isString = curry(checkType)("String");
const isArray = curry(checkType)("Array");

isString("hello"); // true
isArray([]); // true




function curry(fn) {
    // 返回一个新函数，用来接收后续参数
    return function curried(...args) {
      // 如果当前收集到的参数个数已经够了 fn.length === 原函数形参的个数
      // 函数.length === 函数“形参”的数量
      if (args.length >= fn.length) {
        // 直接执行原函数
        return fn.apply(this, args);
      }
  
      // 参数不够，继续返回一个函数，收集参数
      return function (...nextArgs) {
        // 把上一次的参数和这一次的参数合并起来
        return curried.apply(this, args.concat(nextArgs));
      };
    };
  }


  // 测试
  function add(a, b, c) {
    return a + b + c;
  }
  
  const curriedAdd = curry(add);
  
  console.log(curriedAdd(1)(2)(3));  // 6
  console.log(curriedAdd(1, 2)(3));  // 6
  console.log(curriedAdd(1)(2, 3));  // 6
  