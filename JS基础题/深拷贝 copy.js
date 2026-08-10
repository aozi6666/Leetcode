/*
  深拷贝的核心是递归。
  基本类型直接返回，引用类型需要继续递归拷贝。
  为了避免循环引用导致死递归，可以用 WeakMap 记录已经拷贝过的对象。
  对于 Date、RegExp、Map、Set 这些特殊类型，需要单独处理。

  ***循环引用的定义***
    const obj = {
      name: "Tom"
    };

    // 对象里面的某个self属性，又指回了自己
    obj.self = obj;
*****************************************

  *** new WeakMap() 数据结构 ***
  - 专门存 对象关系 的表
  - key不能是 基本数据类型（不同于Map）
  - 弱引用 key，不容易造成内存泄漏

  weakMap.set(obj, cloneObj); // 可以
  weakMap.set("name", "Tom"); // 报错，key 不能是基本类型

  使用案例：
  // WeakMap 不是普通对象 {}，不是“属性名”概念
  // WeakMap 里的 key 是对象 本身的引用地址（weakMap存的是地址关系的映射）
  //             value:  记录它对应的“克隆对象引用堆地址”
  const wm = new WeakMap();   // 一张“登记表”

  // 【原始对象】，对应的克隆结果是【克隆出来的新对象】
  wm.set(原始对象, 克隆出来的新对象);

  wm.get(原始对象);  // 拿到的是【克隆出来的新对象】
  wm.has(原始对象);  // true ，=> 判断这个原对象之前有没有克隆过，存在weakMap中


 深拷贝核心思路,核心就三步：
    - 基本类型直接返回
    - 引用类型（数组 / 对象）递归拷贝
    - 用 WeakMap 解决循环引用
*/

// 参数：target 是旧对象/旧数组
function deepClone(target, map = new WeakMap()) {
  // 1. 基本类型直接返回
  if(typeof target !== 'object' || target === null){
    return target;
  }

  // 2. 判断 map 中是否有（解决循环引用）
  if(map.has(target)){
    return map.get(target);
  }

  const cloneTarget = Array.isArray(target) ? [] : {};

  map.set(target, cloneTarget);

  //  
  for(let key in target){
    if(Object.hasOwnProperty.call(target, key)){
      // 递归
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
  