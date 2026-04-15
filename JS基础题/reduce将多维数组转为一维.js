/*
    redeuce数组方法
    arr.reduce(function(acc, cur, index, array){
        ... 每轮处理逻辑
        return acc;
    }, [初始值])

    concat 遇到数组参数时，会把这个数组里的元素一个个接到后面
    [1, 2].concat([3, 4])  =》 [1, 2, 3, 4]
*/ 

 // 多维数组
const arr = [1, [2, [3, 4]], 5];
function reduceFlatten(arr){
    return arr.reduce(function(acc, cur){
        if(Array.isArray(cur)){
            // 如果当前项还是数组，就递归
            return acc.concat(reduceFlatten(cur));
        }

        // 如果当前项不是数组，就直接返回
        return acc.concat(cur);
    }, []);
    
}

console.log(reduceFlatten(arr));