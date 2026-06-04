/*
发布订阅模式 / 事件订阅发布:
    - on：订阅事件,把函数存起来
    - emit：触发事件,把存起来的函数全部执行
    - off：取消订阅,把某个函数删掉

    const bus = new EventEmitter()

    function sayName(name) {
        console.log('张三')
    }
    function sayAge(age) {
        console.log(12)
    }

    // 订阅: 个事件名可以对应多个处理函数，emit 的时候全部执行(一个个)
    bus.on('user', sayName)
    bus.on('user', sayAge)

    // 触发
    bus.emit('user')   // 输出：张三， 12

    // 取消订阅
    bus.off('user', sayName)

    bus.emit('user')   // 再触发，已经不会执行了 张三 了
*/

// 一个类/构造函数
class EventEmitter {
    // 构造器函数
    constructor() {
        // 来保存所有事件。数据结构：
        // {
        //   click: [fn1, fn2],
        //   login: [fn3]
        // }
        this.events = Object.create(null)
    }

    // 1. 订阅事件：
    on(event, fn){
        // 判断当前事件是否已经订阅过
        if(!this.events[event]){
            // 没有订阅过: 先初始化成一个空数组
            this.events[event] = [];
        }

        // 当前 回调函数fn 放进这个 事件数组(可能多个函数) 
        this.events[event].push(fn);
    }

    // 2. 取消订阅
    off(event, fn){
        // 获取 当前事件 对应的 回调函数数组
        const handlers = this.events[event];

        // 这个事件没人订阅，直接结束
        if(!handlers || handlers.length === 0) return;

        // 找到要删除的那个函数的位置
        // indexOf(): 获取 某个元素 在数组中的索引
        const index =  handlers.indexOf(fn);

        // 存在，从数组里删除
        if(index !== -1){
            // array.splice(开始位置, 删除几个):  “直接修改原数组”
            handlers.splice(index, 1);
        }
    }

    // 3. 触发事件
    emit(event, ...args){
        // 获取 当前事件 对应的 回调函数数组（原数组的引用）
        const handlers = this.events[event];

        // 防止this丢失
        const context = this;

        // 没订阅这个事件，直接结束
        if(!handlers || handlers.length === 0) return;

        // 执行前：先拷贝
        // 避免执行过程中有人 修改/取消订阅，影响原数组
        // array.slice(start, end): 浅拷贝得到新数组，不包含end
        handlers.slice().forEach((fn) => {
            fn.apply(context, args);
        })
    }
}