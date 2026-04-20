/* 
promise.all（异步结果）:
    把多个 Promise 放一起，
    - 全部成功才返回成功结果数组。
    - 只要有任意一个失败，整个就直接失败，失败原因是第一个被拒绝的原因。
    - 非 Promise 值也要支持，用 Promise.resolve() 包一下

    结果数组的顺序按你传入的顺序，不按完成先后顺序。

    参数：接收一个 可迭代对象，通常是数组
*/
function myPromiseAll(promise) {
  return new Promise((resolve, reject) => {
    // 1. 判断参数，必须为数组
    if(!Array.isArray(promise)){
      reject(new TypeError('参数必须是数组'));
    }

    // 2. 空值判断
    if(promise.length === 0) {
      resolve([]);
      return;
    }

    // 3. 初始化
    // 创建结果数组
    const result = [];
    // 记录成功个数
    let completedCount = 0;

    // forEach遍历传来的每一项
    promise.forEach((item, index) => {
      // 每一项的 promise/普通数字/字符串/布尔值 都要 变成 Promise 来统一处理
      Promise.resolve(item)
        .then((value) => {
          // 按索引 存结果（保证顺序），不用push
          result[index] = value;
          // 每成功一个就加一
          completedCount++;

          // 成功个数等于传来数组的总长度，视为成功
          if(completedCount === promise.length){
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        })
    })
  })
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