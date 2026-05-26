/*
手写 Array.prototype.filter
作用：从数组里 筛选出满足条件的元素，返回一个新数组。 
*/


Array.prototype.myFilter = function(fn){
    return this.reduce((acc, cur, index, arr) => {
        if(fn(cur, index, arr)){
            // 满足条件
            acc.push(cur);
        }
        // reduce 必须返回:累加结果acc
        return acc;
    }, [])
}