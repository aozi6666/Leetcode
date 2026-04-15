/*
    redeuce数组方法
    arr.reduce(function(acc, cur, index, array){
        ... 每轮处理逻辑
        return acc;
    }, [初始值])
*/ 

const arr = [1, 2, 3, 2, 1];

function reduceUnique(arr){
   return arr.reduce(function(acc, cur){
    if(acc.indexOf(cur) === -1){
        acc.push(cur);
    }
    return acc;
   }, []);
}

console.log(reduceUnique(arr));