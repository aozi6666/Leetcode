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

Function.prototype.myCall(context, ...args){
    // 获得 context 对象
    context = context == null ? window : Object(context)

    // 获得调用 call的 函数本身
    const fn = this;

    // 构建唯一的key
    const key = Symbol("fn");

    // 原函数方法挂在 context 对象上
    context[key] = fn; 

    // 通过函数的执行
    const result = context[key](...args);

    // 删除key对应的fn
    delete context[key];

    return result;
}
  
const obj = {
  name: "Tom",
};
  
function sayHi(age) {
  console.log(this.name, age);
}

sayHi.myCall(obj, 20, "Shanghai");
