/* ‘
function (num, task)

 - num：最大并发数
 - task：一组异步任务（通常是返回 Promise 的函数数组）

现在有一个函数，接收两个参数：第一个参数是最大并发数 num，
第二个参数是一个任务数组 tasks，数组中的每一项都是一个返回 Promise 的函数。

要求你实现这个函数，使得这些任务在执行时，同一时间最多只能有 num 个任务在并发执行。
当某一个任务执行完成后，需要立刻从任务队列中取下一个任务补上继续执行，直到所有任务都执行完成。

最终函数需要返回一个 Promise，并且返回结果要按照任务原本的顺序进行排列。
*/

// 思路：并发池模型 + queue队列
// 并发池： 控制当前正在执行的任务数量 count，保证同时最多只有 num 个任务在执行
//         每当有任务完成，就从队列里再取一个任务补上，直到所有任务执行完
function runTasksWithLimit(num, tasks) {
    return new Promise((resolve, reject) => {
      // 初始化
      const results = [];  // 结果数组(按顺序存)
      let index = 0;  // 当前执行任务的索引
      let count = 0;  // 当前 正在执行的任务数（控制并发）

      
      
  
      function run() {
        // 所有任务完成
        if (index === tasks.length && count === 0) {
          resolve(results);
          return;
        }
  
        // 控制并发数
        while (count < num && index < tasks.length) {
          const currentIndex = index;
          const task = tasks[index];
          index++;
          count++;
  
          task()
            .then((res) => {
              results[currentIndex] = res;
            })
            .catch(reject)
            .finally(() => {
              count--;
              run(); // 继续补任务
            });
        }
      }
  
      run();
    });
  }
  