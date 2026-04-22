// reduce 的作用是对数组每一项进行累计处理，最终归并成一个结果。
// 实现时需要处理两种情况：
//      - 传了初始值时，从第 0 项开始遍历；没传初始值时，默认用数组第一项作为累计值，从第 1 项开始遍历。
//      - 如果数组为空且没有初始值，需要抛出错误。


// 给“数组的原型对象”新增了一个方法：Array.prototype.myReduce
// 参数：callback 函数，初始值（数组，对象，字符串,数字）
// Array 是构造函数
Array.prototype.myReduce = function (callback, initialValue) {
    // 1. （重要‼️）this 指向调用 myReduce方法 的外部数组
    // arr 就是当前调用 这个方法 的数组本身
    const arr = this;
  
    // 2. 判断 callback 是否是函数
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 3. 定义变量
    // 累计值、上一次计算结果
    let accumulator;
    // 索引：从数组第几项开始遍历
    let startIndex;
  
    // 3. 判断有没有传初始值
    // arguments这个函数传入的参数：arguments.length > 1 ，调用 myReduce 时，是不是传了第二个参数
    if (arguments.length > 1) {
      // 累计值就是初始值
      accumulator = initialValue;
      // 从第 0 项开始遍历
      startIndex = 0;
    } else {
      // 4. 如果没传初始值
      // 空数组，抛出错误
      if (arr.length === 0) {
        throw new TypeError("Reduce of empty array with no initial value");
      }
      
      // 累计值默认取数组第一项
      accumulator = arr[0];
      // 从第 1 项开始遍历（第 0 项已经被当初始值了）
      startIndex = 1;
    }
  
    // 5. 从 startIndex 开始遍历数组
    for (let i = startIndex; i < arr.length; i++) {
      // 6. 每次把上一次结果和当前项传给 callback
      /* 
        callback(prev, cur, index, array)
            - prev：上一次累计结果
            - cur：当前项
            - index：当前下标
            - array：原数组
      */
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  
    // 7. 返回最终累计结果
    return accumulator;
  };
  