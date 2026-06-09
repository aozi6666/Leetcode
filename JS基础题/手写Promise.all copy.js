/* 
promise.all（异步结果）:
    把多个 Promise 放一起，
    - 全部成功才返回成功结果数组。
    - 只要有任意一个失败，整个就直接失败，失败原因是第一个被拒绝的原因。
    - 非 Promise 值也要支持，用 Promise.resolve() 包一下

    结果数组的顺序按你传入的顺序，不按完成先后顺序。

    参数：接收一个 可迭代对象，通常是数组
*/
function promiseAll(promises){
  // 返回一个Promise
  return Promise((reslove, reject) => {
    let res = [];
    let completeSum = 0;

    if(promises.length === 0){
      reslove([]);
      return;
    }

    // 遍历
    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          res[index] = value;
          completeSum++;
          if(promises.length === completeSum){
            reslove(res);
          }
        })
        .catch((err) => {
          reject(err);
        })
    })
  })
}