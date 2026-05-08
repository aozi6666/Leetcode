// Leetcode402  
/* 
    // 数字大小主要由 前面的位数决定： "9xxxx" 一定比 "1xxxx" 大

    // 从左到右扫描数字，用一个 栈 保存最终结果
    思路：
     - 当前数字 digit  > 栈顶元素 && K > 0，入栈
     - 当前数字 digit < 栈顶数字 ，则 栈顶弹出
     - k > 0，并且栈顶 > 当前数字，就弹出栈顶， 当前数字入栈, k--； 
*/

/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
    // 定义栈：存结果
    const stack = [];

    // bian

    for (let digit of num) {
        // 当前数字更小，说明前面的栈顶数字应该被删除
        // 栈顶元素用 stack[stack.length - 1] 表示
        while ( k > 0 && stack.length > 0 && stack[stack.length - 1] > digit) {
            stack.pop();
            // 永久移除这一位，k--
            k--;
        }

        // 栈为空或者栈顶元素小于当前数字，则入栈
        stack.push(digit);
    }

    // 如果 k 还没用完，说明数字整体递增，直接删末尾
    while (k > 0) {
        stack.pop();
        k--;
    }

    // 拼成字符串
    let result = stack.join("");

    // 去掉前导零（正则）
    result = result.replace(/^0+/, "");

    // 如果结果为空，返回 "0"
    return result === "" ? "0" : result;
};

