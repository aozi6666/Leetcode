/*
    异步并发数限制:
        有很多异步任务，但不能一次性全部执行。
        最多只能 同时执行 count 个。
        哪个任务执行完了，就立刻补上下一个任务。
        最后等所有任务都完成

    limit(2, [1000, 1000, 1000, 1000], timeout);

    一共有 4 个任务, 但最多同时执行 2 个
*/

// count: 最大并发数
// tasks: 任务列表(数组形式)
// timeout: 模拟任务耗时
function limit(count, tasksArray, timeout){
    // 初始化

    // 数组： 存储所有任务的 Promise
    // 最后 Promise.all(tasks) : 拿到所有任务结果
    const tasks = [];

    // （控制当前并发数量）存储 正在执行中的任务 的 Promise
    const doingTasks = [];

    // 执行任务的指针
    let index = 0;

    // 回调： 进入任务队列
    const enqueue = function (){
        // 所有任务都已经添加过了: 返回一个成功状态的 Promise
        if(index === tasksArray.length){
            return Promise.resolve();
        }
    }

    const task = Promise.resolve().then(() => {
        // 拿到当前任务参数
        const item = tasksArray[index];
        // index 往后移动一位
        index++;
        // 执行异步任务(微任务)
        return iterateFunc(item);
    })

    // 将这个任务放到所有任务数组中
    tasks.push(task);
}