/*
手写 Array.prototype.filter
作用：从数组里 筛选出满足条件的元素，返回一个新数组。 
*/


// 方法1: for循环实现
Array.prototype.filter = function(fn){
    // 初始化
    const result = [];  // 结果
    // 那个调用 filter 的数组
    const initArr = this;

    // 循环
    for(let i = 0; i < initArr.length; i++){
        // 调用传进来的判断函数 fn()
        // fn.call(this, 当前元素, 当前索引下标, 原数组本身)
        if(fn.call(this, initArr[i], i, initArr)){
            // 如果 fn 返回 true，就把当前元素放进结果数组
            result.push(initArr[i]);
        }
    }

    return result;

}

// 方法2: reduce实现
Array.prototype.myFilter = function(fn){
    // this: 数组本身
    const initArr = this;

    return initArr.reduce((acc, cur, index, arr) => {
        if(fn.call(this, cur, index, arr)){
            // 满足条件
            acc.push(cur);
        }
        // reduce 必须返回:累加结果acc
        return acc;
    }, [])
}

