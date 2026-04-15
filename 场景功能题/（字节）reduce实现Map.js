/* 使用 reduce 设计一个函数 myMap，它接收两个参数：
    - arr：原数组
    - fn：你希望对数组每一项执行的函数

    返回一个新的数组，数组中的每个元素都是原数组中的元素经过 fn 函数处理后的结果。

    reduce 是数组的一个方法: 把数组里的很多项，经过一次次处理，最终“累计”成一个结果。
    - 求和 \ 求积 \ 拼接字符串 \ 统计次数 \ 组装一个新数组
    - reduce 回调的四个参数: 

    arr.reduce(function(acc, cur, index, array) {
            ...返回值
    }, 初始值)

    - acc：累计器
    - cur：当前项
    - index：当前项下标
    - array：原数组
*/
const arr = [10, 20, 30];

const result = arr.reduce(function(acc, cur, index, array) {
  console.log('acc:', acc);
  console.log('cur:', cur);
  console.log('index:', index);
  console.log('array:', array);
  return acc + cur;
}, 0);

console.log(result);