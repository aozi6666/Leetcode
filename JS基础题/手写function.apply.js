/*
手写 call / apply 的核心思路，是把原函数临时挂载到目标对象上，
然后通过对象调用这个函数，因为隐式绑定规则下，谁调用函数，this 就指向谁。
调用完成后再删除这个临时属性。

两者区别只是参数形式不同，call 是逐个传参，apply 是数组传参。 
*/

Function.prototype.myApply = function (context, args) {
    // 1. 处理 context
    context = context || window;
  
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
      result = context[key](...args);
    }
  
    // 6. 删除临时属性
    delete context[key];
  
    // 7. 返回结果
    return result;
  };

  const obj = {
    name: "Tom",
  };
  
  function sayHi(age, city) {
    console.log(this.name, age, city);
  }
  
  sayHi.myApply(obj, [20, "Shanghai"]);