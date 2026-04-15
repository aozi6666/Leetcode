/*
    redeuce数组方法
    arr.reduce(function(acc, cur, index, array){
        ... 每轮处理逻辑
        return acc;
    }, [初始值])
*/ 

const arr = [1,2,3,4];
function reduceAdd(arr){
    return arr.reduce(function(acc, cur){
        acc += cur;
        return acc;
    }, 0);
}

console.log(reduceAdd(arr));