/*
 深拷贝核心思路,核心就三步：
    - 基本类型直接返回
    - 引用类型递归拷贝
    - 用 WeakMap 解决循环引用
*/

function deepClone(target, map = new WeakMap()) {
    // 1. 如果是基本类型，或者是 null，直接返回
    //    因为基本类型本身就不存在“深拷贝”问题
    if (target === null || typeof target !== "object") {
      return target;
    }
    
    // 遇到 Date 和 RegExp，还要做特殊处理
    // 2. 处理 Date
    if (target instanceof Date) {
      return new Date(target);
    }
  
    // 3. 处理 RegExp
    if (target instanceof RegExp) {
      return new RegExp(target);
    }
  
    // 4. 处理循环引用
    //    如果当前对象已经拷贝过，直接返回之前存的结果
    if (map.has(target)) {
      return map.get(target);
    }
  
    // 5. 判断当前值是数组还是普通对象
    const cloneTarget = Array.isArray(target) ? [] : {};
  
    // 6. 提前存到 WeakMap 里
    //    这样如果后面遇到循环引用，就可以直接取出来
    map.set(target, cloneTarget);
  
    // 7. 遍历对象自身属性，递归拷贝
    for (const key in target) {
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
  