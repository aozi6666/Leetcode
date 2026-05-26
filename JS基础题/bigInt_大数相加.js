/*
题目：不用 JavaScript 自带的 BigInt，自己实现两个超大整数相加。
        -> 大整数当成字符串来逐位相加(竖式加法带carry进位)

    - JS 的 Number 有精度限制，超过安全整数范围后会不准确
    Number.MAX_SAFE_INTEGER   // 9007199254740991
*/

function addBigInt(num1, num2){
    // 解题思路：双指针 + 进位
    // 1. 转为字符串
    num1 = String(num1);
    num2 = String(num2);

    // 2.初始化
    let carry = 0;

    let i = num1.length - 1;
    let j = num2.length - 1;

    const res = [];

    // 循环：从未位开始加
    while(i >= 0 || j >= 0 || carry){
        // 得到此次相加的位置
        const x = i >= 0 ? Number(num1[i]) : 0;
        const y = j >= 0 ? Number(num2[j]) : 0;

        // 竖式加法
        const sum = x + y + carry;

        res.push(sum % 10);
        carry = Math.floor(sum / 10);

        // 下一组
        i--;
        j--;
    }

    return res.reverse().join('');
}


console.log(addBigInt("999999999999999999", "1"));

