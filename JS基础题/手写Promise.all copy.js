/* 
promise.all（异步结果）:
    把多个 Promise 放一起，
    - 全部成功才返回成功结果数组。
    - 只要有任意一个失败，整个就直接失败，失败原因是第一个被拒绝的原因。
    - 非 Promise 值也要支持，用 Promise.resolve() 包一下

    结果数组的顺序按你传入的顺序，不按完成先后顺序。

    参数：接收一个 可迭代对象，通常是数组
*/
function PromiseAll(promises){
  // 返回Promise
  return new Promise((resolve, reject) => {
    // 参数判断：必须是数组
    if(!Array.isArray(promises)){
      throw TypeError("参数必须是数组");
      return;
    }

    // 空值判断
    if(promises.length === 0){
      resolve([]);
      return;
    }

    let count = 0;
    let result = [];

    // 便历Promises中的每一项
    promises.forEach((item, index) => {
      // 用 Promise 包裹结果
      Promise.resolve(item)
        .then((res) => {
          result[index] = res;
          count++;

          if(count === promises.length){
            resolve[result];
          }
        })
        .catch((err) => {
          reject(err);
        })
    })
  })
}