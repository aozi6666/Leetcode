/* 
    instanceof 是用来判断：某个对象，是不是某个构造函数“造出来的”实例
    真正判断的是：
    - 构造函数的 prototype，有没有出现在对象的原型链上。
*/

function myInstanceof(left, right) {
    // 1. 基本类型直接返回 false
    //    因为 instanceof 主要判断的是对象
    if (left === null || (typeof left !== "object" && typeof left !== "function")) {
      return false;
    }
  
    // 2. 取到右边构造函数的 prototype
    const prototype = right.prototype;
  
    // 3. 取到左边对象的原型
    let proto = Object.getPrototypeOf(left);
  
    // 4. 顺着原型链一直往上找
    while (proto !== null) {
      // 5. 如果找到了 right.prototype，说明是它的实例
      if (proto === prototype) {
        return true;
      }
  
      // 6. 继续往上一层原型找
      proto = Object.getPrototypeOf(proto);
    }
  
    // 7. 找到头都没找到，返回 false
    return false;
  }
  