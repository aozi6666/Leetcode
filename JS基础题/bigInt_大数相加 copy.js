/*
题目：不用 JavaScript 自带的 BigInt，自己实现两个超大整数相加。
        -> 大整数当成字符串来逐位相加(竖式加法带carry进位)

    - JS 的 Number 有精度限制，超过安全整数范围后会不准确
    Number.MAX_SAFE_INTEGER   // 9007199254740991
*/

function addBigInt(num1, num2){
    // 解题思路：末尾-双指针 + 进位

    // 准备工作：数字转字符串
    let string1 = String(num1);
    let string2 = String(num2);

    let carry = 0;

    let i = num1.length - 1;
    let j = num2.length - 1;

    const res = [];

    // 循环
    while(i >= 0 || j >= 0 || carry){
        // 得到此次相加的位置
        const x = i > 0 ? Number(string1[i]) : 0;
        const y = j > 0 ? Number(string2[j]) : 0;
        
        // 相加
        const sum = x + y + carry;

        // 更新进位
        carry = Math.floor(sum / 10);
        res.push(sum % 10);

        // 下一组
        i--;
        j--;
    
    }

    return res.reverse.join('');

}

console.log(addBigInt("999999999999999999", "1"));

