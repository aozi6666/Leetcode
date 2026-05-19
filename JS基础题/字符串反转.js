// 字符串“abcd”反转

// 方法1
function reverse(str){
    // 边界判断
    if(str.length <= 1) return str;

    return str.split('').reverse().join('');
}

console.log(reverse('abcd'));

// 方法2: reduce
function reverseStr(str){
    return str.split('').reduce((acc, cur) => {
        return cur + acc;
    }, '');
}



console.log(reverseStr('hello world'));
