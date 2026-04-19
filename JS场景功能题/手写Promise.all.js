

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
  