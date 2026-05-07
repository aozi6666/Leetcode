/*
  深拷贝的核心是递归。
  基本类型直接返回，引用类型需要继续递归拷贝。
  为了避免循环引用导致死递归，可以用 WeakMap 记录已经拷贝过的对象。
  对于 Date、RegExp、Map、Set 这些特殊类型，需要单独处理。

 深拷贝核心思路,核心就三步：
    - 基本类型直接返回
    - 引用类型（数组 / 对象）递归拷贝
    - 用 WeakMap 解决循环引用
*/
function deepClone(target, map = new WeakMap()) {
  // 1. 基本类型直接返回
  if (target === null || typeof target !== "object") {
    return target;
  }

  // 2. 解决循环引用
  if (map.has(target)) {
    return map.get(target);
  }

  // 3. 区分数组和对象
  const cloneTarget = Array.isArray(target) ? [] : {};

  // 4. 先存 map，防止循环引用
  map.set(target, cloneTarget);

  // 5. 遍历自身属性
  for (let key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      cloneTarget[key] = deepClone(target[key], map);
    }
  }

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
  