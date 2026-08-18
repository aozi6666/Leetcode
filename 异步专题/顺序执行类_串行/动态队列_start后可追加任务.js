// 模版二：动态队列（多一个 running 锁）
// 添加任务后，如果当前没人执行，就自动开始执行
// 执行过程中，还可以继续加任务


class DynamicQueue {
    constructor(){
        this.queue = [];
        this.running = false;
    }

    // 添加任务（有runnin锁，执行过程中还可继续添加）
    addTask(time, fn){
        this.queue.push({time: fn})

        if(this.running === false){
            this.run();
        }

        return this;
    }

    async run(){
        this.running = true;

        while(this.queue.length > 0){
            // 取出队列第一个元素
            const task = this.queue.shift();

            // 在定时器内执行
            await new Promise((reslove) => {
                return setTimeout(reslove, task.time);
            })
            
            // 执行
            await task.fn();
        }

        // 执行完，解锁
        this.running = false;
    }
}