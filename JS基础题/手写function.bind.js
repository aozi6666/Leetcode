/* 
    bind 的作用: 绑定函数执行时的 this 指向，提前传一部分参数。
    
    function.bind 不会立刻调用，而是返回一个新函数,这个新函数不会立刻执行，
    它内部的 this 会被固定绑定到指定对象上，
    同时还可以预先保存一部分参数，等真正调用时再把剩余参数补上。
*/

Function.prototype.myBind = function (context, ...args) {
    // 1. this 指向调用 myBind 的原函数
    const fn = this;
  
    // 2. 返回一个新函数
    return function (...restArgs) {
      // 3. 执行原函数，并把 this 绑定到 context
      //    同时把两次传入的参数拼接起来
      return fn.apply(context, args.concat(restArgs));
    };
  };
  