/* ‘
【题目描述】实现一个 SuperTask 类，用来控制异步任务的并发执行数量。

要求：
创建实例时可以传入 最大并发数 poolSize。
通过 add(task) 方法 添加异步任务，
 - 同一时刻最多只能有 poolSize 个任务同时执行。
 - 当某个任务执行完成后，需要自动从 等待队列queue 中取出下一个任务继续执行

add(task) 需要返回一个 Promise，调用方 可以拿到 当前任务的执行结果

【输入参数】
constructor(options)
options.poolSize：数字 Number 类型，表示最大并发数
add(task) task：一个函数function

调用 task() 后需要返回 Promise

【输出】
add(task) 的返回值 ： 返回一个 Promise

- task 成功时，返回该任务的结果
- task 失败时，返回错误

整体行为
所有任务按 添加顺序 进入队列 -> 任务执行顺序受并发数限制 -> 同时运行中的任务数不能超过 poolSize
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
class SuperTask {
  // 构造器函数：创建实例，传入最大并发数 poolSize
  constructor(options) {
    this.poolSize = options.poolSize; // 最大并发数
    this.queue = [];                  // 任务队列
    this.runningCount = 0;            // 当前执行中的任务数
  }

  // 添加任务回调
  add(task) {
    return new Promise((resolve, reject) => {
      // 添加到等待队列
      this.queue.push({ task, resolve, reject });

      // 尝试调度任务
      this.run();
    });
  }

  // 调度任务
  run() {
    // 并发没满 + 队列中还有任务
    while (this.runningCount < this.poolSize && this.queue.length > 0) {
      // 取一个任务
      const { task, resolve, reject } = this.queue.shift();

      // 并发数 +1
      this.runningCount++;

      // 执行任务
      Promise.resolve(task())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          // 当前任务执行结束，释放一个并发位置
          this.runningCount--;

          // 继续补任务
          this.run();
        });
    }
  }
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