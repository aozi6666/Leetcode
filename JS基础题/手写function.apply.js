/*
函数.apply(this指向, 参数数组)
手写 call / apply 的核心思路，是把 原函数 临时挂载到 目标对象上，
然后通过 对象调用这个函数，因为隐式绑定规则下，谁调用函数，this 就指向谁。
调用完成后再删除这个临时属性。

两者区别只是参数形式不同，call 是逐个传参，apply 是数组传参。

实现上和 myCall的差别：
    1. 参数形式不同 （apply参数是打包成一个数组/类数组传， 直接 args）
    2. 中间多了判断：
        - myCall 里不用单独判断，因为 ...args 是剩余参数，不传参数时，args是[]空数组
        - myApply 里需要单独判断，因为 args 是类数组，不传参数时，args === null
          context[key](...args)  === context[key](undefined)会报错
*/

// 函数.apply(this指向, 参数数组)
Function.prototype.myApply = function (context, args) {
    // 1. 处理 context
    // 细节：null 和 undefined 在非严格模式下都会指向全局对象
    // 要写 == 而不是 ===，== null 可以同时匹配 null 和 undefined
    context = context == null ? window : Object(context);
  
    // 2. this 是调用 myApply 的原函数
    const fn = this;
  
    // 3. 创建唯一属性，防止冲突
    const key = Symbol("fn");
  
    // 4. 临时挂载函数
    context[key] = fn;
  
    let result;
  
    // 5. args 可能没传
    if (args == null) {
      result = context[key]();
    } else {
      // “数组传参”，但真正调用函数的时候，还是得把 数组拆开 再传进去
      result = context[key](...args);
    }
  
    // 6. 删除临时属性
    delete context[key];
  
    // 7. 返回结果
    return result;
  };


const obj = {
  name: "我是object中的name属性"
}

function showInfo(age, city) {
  // 展示信息
  console.log(this.name, age, city);
}

// apply  含义
// 立刻调用 showInfo函数，让 showInfo函数 里面的 this 指向 obj
showInfo.myApply(obj, [18, "上海"])