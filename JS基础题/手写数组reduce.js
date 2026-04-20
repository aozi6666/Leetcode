// 手写 call / apply 的核心思路，是把原函数临时挂载到目标对象上，然后通过对象调用这个函数，因为隐式绑定规则下，谁调用函数，this 就指向谁。调用完成后再删除这个临时属性。两者区别只是参数形式不同，call 是逐个传参，apply 是数组传参。

Array.prototype.myReduce = function (callback, initialValue) {
    // 1. this 指向调用 myReduce 的数组
    const arr = this;
  
    // 2. 判断 callback 是否是函数
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
  
    let accumulator;
    let startIndex;
  
    // 3. 如果传了初始值，累计值就是初始值，从第 0 项开始遍历
    if (arguments.length > 1) {
      accumulator = initialValue;
      startIndex = 0;
    } else {
      // 4. 如果没传初始值，累计值默认取数组第一项，从第 1 项开始遍历
      if (arr.length === 0) {
        throw new TypeError("Reduce of empty array with no initial value");
      }
  
      accumulator = arr[0];
      startIndex = 1;
    }
  
    // 5. 从 startIndex 开始遍历数组
    for (let i = startIndex; i < arr.length; i++) {
      // 6. 每次把上一次结果和当前项传给 callback
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  
    // 7. 返回最终累计结果
    return accumulator;
  };
  