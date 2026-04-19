/* 
promise.all:
    把多个 Promise 放一起，
    - 全部成功才返回成功结果数组。
    - 只要有任意一个失败，整个就直接失败，失败原因是第一个被拒绝的原因。
    
    结果数组的顺序按你传入的顺序，不按完成先后顺序。
*/
function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        reject(new TypeError("Argument must be an array"));
        return;
      }
  
      const results = [];
      let completedCount = 0;
  
      if (promises.length === 0) {
        resolve([]);
        return;
      }
  
      promises.forEach((item, index) => {
        Promise.resolve(item)
          .then((value) => {
            results[index] = value;
            completedCount++;
  
            if (completedCount === promises.length) {
              resolve(results);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }
  