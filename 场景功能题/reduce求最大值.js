/*
    redeuce数组方法
    arr.reduce(function(acc, cur, index, array){
        ... 每轮处理逻辑
        return acc;
    }, [初始值])
*/ 
const arr = [1, 2, 3, 2, 1]

function reduceMax(arr){
    return arr.reduce(function(acc, cur){
        return Math.max(acc, cur);
    }, 0)
}

console.log(reduceMax(arr))