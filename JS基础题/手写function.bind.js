/* 
    bind 的作用: 绑定函数执行时的 this 指向，提前传一部分参数。
    
    function.bind 不会立刻调用，而是返回一个新函数,这个新函数不会立刻执行，
    它内部的 this 会被固定绑定到指定对象上，
    同时还可以预先保存一部分参数，等真正调用时再把剩余参数补上。
*/

Function.prototype.myBind = function (context, ...args) {
    // 1. 当前 this 就是调用 myBind 的原函数
    const fn = this;
  
    // 2. bind 只能绑定函数，做一层保护
    if (typeof fn !== "function") {
      throw new TypeError("myBind must be called on a function");
    }
  
    // 3. 返回绑定后的函数
    function boundFn(...restArgs) {
      // 4. 判断是否通过 new 调用
      //    如果是 new boundFn()，此时 this 应该指向新实例
      //    并且要忽略传入的 context
      const isNew = this instanceof boundFn;
  
      // 5. 决定真正执行时的 this
      //    - 普通调用：this 指向 context
      //    - new 调用：this 指向 new 创建出来的实例
      const finalThis = isNew ? this : context;
  
      // 6. 执行原函数
      //    拼接 bind 时传入的参数 + 调用时传入的参数
      return fn.apply(finalThis, [...args, ...restArgs]);
    }
  
    // 7. 处理原型链
    //    原生 bind 返回的函数，如果被 new 调用，
    //    新对象应当能继承原函数 prototype 上的方法
    if (fn.prototype) {
      boundFn.prototype = Object.create(fn.prototype);
    }

    return boundFn;
  };
  

// 用法
function say(age, city) {
  console.log(this.name, age, city);
}

const obj = {
  name: "张三"
};

// 先把 say函数 里面的 this 绑定成 obj
// 提前传一个参数 age=18
// 返回一个新函数 newFn，就是执行 函数say，传递剩下的参数
const newFn = say.bind(obj, 18);

// 等价于执行 say.apply(obj, [18, "北京"]);
newFn("北京");  // 张三 18 北京
  