/* 
promise.all（异步结果）:
    把多个 Promise 放一起，
    - 全部成功才返回成功结果数组。
    - 只要有任意一个失败，整个就直接失败，失败原因是第一个被拒绝的原因。
    - 非 Promise 值也要支持，用 Promise.resolve() 包一下

    结果数组的顺序按你传入的顺序，不按完成先后顺序。

    参数：接收一个 可迭代对象，通常是数组
*/
function myPromiseAll(promises) {
    // 把“最终结果”包装成一个 Promise 返回出去 - 继续 .then() / .catch()
    // resolve 和 reject： 控制的是 myPromiseAll 返回出去的这个新 Promise 的状态。（总结果）
    return new Promise((resolve, reject) => {
      // 判断参数： 必须是数组
      if (!Array.isArray(promises)) {
        reject(new TypeError("Argument must be an array"));
        // 结束当前函数，不要再往下执行了
        return;
      }

      // 空值判断
      if (promises.length === 0) {
        resolve([]);
        return;
      }
      
      // 结果数组
      const results = [];
      // 计数成功个数
      let completedCount = 0;
      
      // 遍历传来的Promise数组的每一项
      promises.forEach((item, index) => {
        // 每一项的 promise/普通数字/字符串/布尔值 都要 变成 Promise 来统一处理
        Promise.resolve(item)
          .then((value) => {
            // 数组。按 索引 收集结果（不用 push）
            results[index] = value;
            // 每成功一个就加一
            completedCount++;
            
            // 成功个数等于总长度时，全部完成
            if (completedCount === promises.length) {
              resolve(results);
            }
          })
          .catch((err) => {
            // 只要有一个失败，整个就失败
            reject(err);
          });
      });
    });
  }
  
// 测试
  const p1 = Promise.resolve(1);
  const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 500));
  const p3 = 3;
  
  myPromiseAll([p1, p2, p3])
    .then((res) => {
      console.log(res); // [1, 2, 3]
    })
    .catch((err) => {
      console.error(err);
    });