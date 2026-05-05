/*
 * @lc app=leetcode.cn id=415 lang=javascript
 * @lcpr version=30403
 *
 * [415] 字符串相加
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
    // 绝对不能使用 字符串转 ASIC 码，大数会丢失精度
    // 解题思路：（双指针）模拟加法，从字符串的 末尾 开始，一位一位相加
    // 进位 carry（初始为 0）

    // 指针分别指向两个字符串末尾
    let i = num1.length - 1;
    let j = num2.length - 1;

    // 进位
    let carry = 0;

    // 结果（用数组收集更方便）
    let res = [];

    // 只要还有数字 或 还有进位，就继续
    while (i >= 0 || j >= 0 || carry !== 0) {

        // 取当前位（如果越界就当 0）
        let x = i >= 0 ? num1[i] - '0' : 0;
        let y = j >= 0 ? num2[j] - '0' : 0;

        // 当前位的和
        let sum = x + y + carry;

        // 当前位结果（个位）
        res.push(sum % 10);

        // 更新进位
        carry = Math.floor(sum / 10);

        // 指针往前走
        i--;
        j--;
    }

    // 因为是从低位往高位加的，需要反转
    return res.reverse().join('');
    
};
// @lc code=end



/*
// @lcpr case=start
// "11"\n"123"\n
// @lcpr case=end

// @lcpr case=start
// "456"\n"77"\n
// @lcpr case=end

// @lcpr case=start
// "0"\n"0"\n
// @lcpr case=end

 */

