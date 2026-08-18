// 串行排队：有一串任务，每个任务都要“等一会儿”再执行。 【前一个没做完，后一个不能开始】
//  this.queue 是一个数组，里面每个元素都是一个对象
        // [
        //     { time: 1000, fn: fn1 },
        //     { time: 2000, fn: fn2 },
        //     { time: 3000, fn: fn3 }
        // ]
// 模板 1：先收集 任务task，再 start 执行

class TaskQueue{
    // 构造器：初始化 类 中的 队列属性
    constructor() {
        this.queue = [];
    }

    // task 方法： 只收集数据，不执行
    addtask(time, fn){
        this.queue.push({time: fn});

        // 必须返回this,才能支持链式调用
        // 链式调用的核心：每一步都把当前对象还回去。
        return this;
    }

    // 真正的 异步执行函数
    async start() {
        // 从队列中 从头取任务执行
        for(const task of this.queue){
            // 开始用 Promsie 按时间排序：传入的time 秒后调用 resolve,表示Promise完成
            await new Promise((resolve) => {
                // setTimeout(函数， 时间)
                return setTimeout(resolve, task.time);
            })

            // 执行 task
            await task.fn();
        }
    } 
}

// 使用

// 1. 创建一个 实例对象 带队列
const taskQueue = new TaskQueue();

// 2. 加入任务 1：等 1000ms，然后打印 1
//    加入任务 2：等 2000ms，然后打印 2
//    加入任务 3：等 3000ms，然后打印 3

// 3. 调用 start，正式开始一个一个执行
taskQueue.addtask(1000, () => console.log(1))
         .addtask(2000, () => console.log(2))
         .addtask(3000, () => console.log(3))

// 3. 调用 start，正式开始一个一个执行
taskQueue.start();

