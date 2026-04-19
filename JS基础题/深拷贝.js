/*
 深拷贝核心思路,核心就三步：
    - 基本类型直接返回
    - 引用类型递归拷贝
    - 用 WeakMap 解决循环引用
*/

function deepClone(target) {
    // 1. 基本类型直接返回
    //    因为基本类型不存在“深拷贝”问题
    //    比如 number、string、boolean、undefined、symbol、bigint、null
    if (target === null || typeof target !== "object") {
      return target;
    }
  
    // 2. 如果是数组，创建一个新数组
    if (Array.isArray(target)) {
      const cloneTarget = [];
  
      // 递归拷贝数组每一项
      for (let i = 0; i < target.length; i++) {
        cloneTarget.push(deepClone(target[i]));
      }
  
      return cloneTarget;
    }
  
    // 3. 如果是 Set，创建一个新 Set
    if (target instanceof Set) {
      const cloneTarget = new Set();
  
      // Set 里的每一项也要递归拷贝
      target.forEach((value) => {
        cloneTarget.add(deepClone(value));
      });
  
      return cloneTarget;
    }
  
    // 4. 如果是 Map，创建一个新 Map
    if (target instanceof Map) {
      const cloneTarget = new Map();
  
      // 这里保持“最小改动”思路：
      // key 一般默认直接使用原 key
      // value 做递归深拷贝
      target.forEach((value, key) => {
        cloneTarget.set(key, deepClone(value));
      });
  
      return cloneTarget;
    }
  
    // 5. 普通对象处理
    const cloneTarget = {};
  
    // 6. 用 Reflect.ownKeys 遍历对象自身所有 key
    //    这样不仅能拿到普通字符串 key，
    //    还能拿到 Symbol key
    Reflect.ownKeys(target).forEach((key) => {
      cloneTarget[key] = deepClone(target[key]);
    });
  
    return cloneTarget;
  }
  

/**
 * 测试
 */
// 使用例子 1：普通对象
const obj = {
    name: "Tom",
    age: 20,
    hobby: ["篮球", "游戏"],
    info: {
      city: "上海",
    },
  };
  
  const newObj = deepClone(obj);
  
  newObj.name = "Jerry";
  newObj.hobby.push("跑步");
  newObj.info.city = "北京";
  
  console.log(obj);
  // {
  //   name: "Tom",
  //   age: 20,
  //   hobby: ["篮球", "游戏"],
  //   info: { city: "上海" }
  // }
  
  console.log(newObj);
  // {
  //   name: "Jerry",
  //   age: 20,
  //   hobby: ["篮球", "游戏", "跑步"],
  //   info: { city: "北京" }
  // }

//   使用例子 2：数组嵌套对象
const arr = [1, 2, { a: 10, b: [100, 200] }];

const newArr = deepClone(arr);

newArr[2].a = 999;
newArr[2].b.push(300);

console.log(arr);    
// [1, 2, { a: 10, b: [100, 200] }]

console.log(newArr); 
// [1, 2, { a: 999, b: [100, 200, 300] }]

// 使用例子 3：循环引用
const obj3 = {
    name: "Tom",
  };
  
  obj.self = obj3;
  
  const newObj = deepClone(obj3);
  
  console.log(newObj);
  // { name: "Tom", self: [Circular] }
  
  console.log(newObj.self === newObj); 
  // true
  