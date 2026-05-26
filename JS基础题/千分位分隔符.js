/*
千分位分隔符:  123456789 变为 123,456,789
*/

function thousandSeparator(n){
    // 解题思路：从字符串最后一位开始遍历，每数 3 个数字，在前面插入一个逗号

    // 1. 数字转字符串
    n = n.toString();

    // 2. 初始化
    let count = 0;  // 计数器: 记录当前已经处理了几个数字
    const res = [];  // 结果

    // 3. 遍历： 从最后一位
    for(let i = n.length - 1; i >= 0; i--){
        // 每次进来一个字符，处理数 + 1
        count++;

        // 前 3 个数字直接放进去
        if(count <= 3){
            res.push(n[i]);
        } 
        else if(count > 3){
            // 第 4 个数字时，先插入 逗号 ，再插入当前数字 count重置为1
            res.push(',');
            res.push(n[i]);

            // 重置计数器
            count = 1;
        }
    }

    // 4.返回结果，记得反转
    return res.reverse().join('');
}