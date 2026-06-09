/*
    call 的作用就是：马上调用这个函数，并且强行指定 this 指向谁。 
    借用别人的函数，让这个函数里的 this 临时指向你指定的对象。
    把这个函数临时放到对象身上，再让对象去调用它。谁调用函数，函数里的 this 就指向谁

    - call 是逐个传参
    - apply 是数组传参

    实现关键: 通过 访问 对象中的方法
    context[key] = fn;
    context[key](...args);
    - 先把原函数 fn 临时挂到 context 身上
    - 再通过 context 来调用这个函数
    - 这样函数里的 this 就变成 context 了

*/

const { context } = require("three/examples/jsm/nodes/Nodes.js");

/* 
 * 函数.call(对象, 参数1, 参数2, 参数3...)，参数为：
 *  - context对象:  你想把 this 改成指向谁 （对象）
 *  - args:  除第一个参数 context 以外，剩下所有参数，都收集到一个数组里
*/
Function.prototype.myCall = function (context, ...args) {
    // 1. 如果 context 是 null 或 undefined
    //    浏览器环境，非严格模式，指向全局 window 对象
    // Object(context)：把 context 强制转成对象。
    context = context == null ? window : Object(context);
  
    // 2. 得到 调用function.myCall 的 函数
    // this 就是调用 myCall 的原函数
    const fn = this;
  
    // 3. 避免与原有 context对象的 fn 方法属性重名覆盖
    //    使用Symbol方法创建一个唯一 属性名
    const key = Symbol("fn");
  
    // 4. 把 原函数-方法 临时挂到 context对象 身上
    //    属性名为key,属性值为 fn(原方法)
    // ontext[key]：取contenx对象中 属性名为 key 的属性值(变量/方法)
    context[key] = fn;
  
    // 5. 通过 对象调用函数，实现this的指向
    //    这样函数里的 this 就会指向 context
    const result = context[key](...args);
  
    // 6. 调用完成后,删除 context 对象 上的临时方法
    delete context[key];
  
    // 7. 返回函数执行结果
    return result;
  };
  
  const obj = {
    name: "Tom",
  };
  
  function sayHi(age) {
    console.log(this.name, age);
  }
  
  sayHi.myCall(obj, 20, "Shanghai");


Function.prototype.myCall = function(context, ...args){
  // 初始化对象
  context = context == null ? window : Object(context);
  // 拿到 原函数
  const fn = this;

  // 创建唯一的key
  const key = new Symbol('fn');

  // 挂到对象方法上
  context[key] = fn;

  // 执行
  const result =  context[key](...args);

  // 删除方法
  delete context[key];

  return result;
}