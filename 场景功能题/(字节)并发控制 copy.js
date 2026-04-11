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

/*
Promise使用
 .then —— 当前的任务，成功时执行
 .catch —— 当前的任务，失败时执行，整个任务直接失败，不再继续
 .finally —— 不管成功失败都要做的事：腾出一个位置（count--）， 再添加新的（run）
*/

/**
 * @param {number} num
 * @param {Function[]} tasks
 * @return {Promise}
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

      // 任务调度函数：不断往 执行池 里添加任务

      function run() {
        // 结束条件： 所有任务都执行完，且执行池为空
        if( index === tasks.length && count === 0) {
            resolve(results);  // 将结果 resolve 出去
            return;
        }

        // 控制并发(并发没满，就不断往里面加任务)
        // 循环条件：执行任务count数，没超过并发上限 && 索引没超过任务数组长度
        while(count < num && index < tasks.length) {
            // 保存任务位置（用于保证后续结果顺序）
            const taskIndex = index;
            const task = tasks[index];

            index++;  // 取下一个任务
            count++;  // 当前执行任务的并发数 +1

            // 开始执行任务：处理 Promise
            task()
                // 执行任务
                .then((res) => {
                    // 把结果 按原顺序 存到 results
                    results[taskIndex] = res;
                })
                // 任意一个任务失败，直接 reject 整个 Promise
                .catch(reject)
                // 补任务：从任务队列里取一个任务补上
                .finally(() => {
                    count--;  // 个任务执行完了， 并发数减少
                    run();    // 调用 run() 👉 补一个新任务进来
                })
        }
      }

      // 启动调度器
      run();
    });
  }

/* 
        开始
        ↓
        调用 run()
        ↓
        while (并发没满 && 还有任务)
        ├── 取一个任务（index++）
        ├── 并发数 +1（count++）
        ├── 执行 task()
        │     ├── 成功 → then（存结果）
        │     ├── 失败 → catch（报错）
        │     └── 最终 → finally
        │            ├── count--
        │            └── 再调用 run()（补任务）
        ↓
        所有任务发完 && count = 0
        ↓
        resolve(results)
        ↓
        结束
*/