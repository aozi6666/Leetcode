/*
    call 的作用就是：马上调用这个函数，并且强行指定 this 指向谁。 
    借用别人的函数，让这个函数里的 this 临时指向你指定的对象。

    - call 是逐个传参
    - apply 是数组传参
*/

Function.prototype.myCall = function (context, ...args) {
    // 1. 如果 context 是 null 或 undefined
    //    浏览器环境下一般指向 window
    context = context || window;
  
    // 2. this 就是调用 myCall 的原函数
    const fn = this;
  
    // 3. 为了避免覆盖 context 原来的属性
    //    这里用 Symbol 创建一个唯一属性名
    const key = Symbol("fn");
  
    // 4. 把原函数临时挂到 context 身上
    context[key] = fn;
  
    // 5. 通过对象调用函数
    //    这样函数里的 this 就会指向 context
    const result = context[key](...args);
  
    // 6. 调用完成后删除这个临时属性
    delete context[key];
  
    // 7. 返回函数执行结果
    return result;
  };
  
  const obj = {
    name: "Tom",
  };
  
  function sayHi(age, city) {
    console.log(this.name, age, city);
  }
  
  sayHi.myCall(obj, 20, "Shanghai");