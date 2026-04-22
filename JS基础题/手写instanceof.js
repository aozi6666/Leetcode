/* 
    instanceof 是用来判断：某个对象，是不是某个构造函数“造出来的”实例
    obj instanceof Foo

    真正判断的是：
    - 右边构造函数的 prototype，有没有出现在左边对象的原型链上。

    instanceof 的本质：判断右侧构造函数的 prototype 是否出现在左侧对象的原型链上。
    实现：先拿到右侧的 prototype，
         再通过 Object.getPrototypeOf（.__proto__） 不断向上查找左侧对象的原型链，
         如果找到就返回 true，直到原型链尽头 null 还没找到就返回 false
*/

function myInstanceof(left, right) {
  // 1. 基本类型直接返回 false
  if (left === null || (typeof left !== "object" && typeof left !== "function")) {
    return false;
  }

  // 2. 取右边构造函数的 prototype
  const prototype = right.prototype;

  // 3. 从左边对象的 __proto__ 开始找
  let proto = left.__proto__;

  // 4. 顺着原型链一直往上找
  while (proto !== null) {
    if (proto === prototype) {
      return true;
    }
    proto = proto.__proto__;
  }

  // 5. 找不到就返回 false
  return false;
}
