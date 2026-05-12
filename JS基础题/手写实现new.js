/* 
    new 的作用就是：根据构造函数创建一个新对象。
    new 的核心过程有四步：
        第一，创建一个空对象（实例对象）；
        第二，把这个实例对象的 原型__protp__ 指向 构造函数的 prototype；
        第三，执行构造函数 并把 this 绑定到这个新对象上；
        第四，如果构造函数返回的是对象就返回该对象，否则返回新创建的对象。
*/
function myNew(Constructor, ...args) {
    // 1. 创建一个新对象，并让它的原型__prpto__指向构造函数的 prototype
    // Object.create: 创建一个新对象，并指定它的原型
    const obj = Object.create(Constructor.prototype);
  
    // 2. 执行构造函数，并把 this 绑定到新对象上
    // Constructor构造器函数：就是函数
    //             - 无返回：result = undefined
    //             - 返回对象：result = 对象
    const result = Constructor.apply(obj, args);
  
    // 3. 如果构造函数返回的是对象，就返回这个对象
    //    否则返回我们创建的新对象
    return (result !== null && (typeof result === "object" || typeof result === "function")) ? result : obj;
  }
  