/*
    redeuce数组方法
    arr.reduce(function(acc, cur, index, array){
        ... 每轮处理逻辑
        return acc;
    }, [初始值])
*/ 

const str = 'hello world';

// 方法1：使用 split
function splitReverse(str){
    return str.split('').reverse().join('');
}

// 方法2：使用 reduce
function reduceReverse(str){
    // 字符串转数组
    strArr = Array.from(str);
   return strArr.reduce(function(acc, cur){
    // 每轮拼接：【当前字符 - acc】
    return cur + acc;
   }, '')
}

console.log(reduceReverse(str));