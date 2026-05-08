/*
 * @lc app=leetcode.cn id=647 lang=javascript
 * @lcpr version=30403
 *
 * [647] 回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    // 解题思路：中心扩散法
    // 两种中心：单个字符为中心：比如 "aba"，中心是 b
    //         两个字符为中心：比如 "aa"，中心是两个 a 中间

    let count = 0;

    // 从 left 和 right 开始向两边扩散
    function expand(left, right) {
        while ( left >= 0 && right < s.length && s[left] === s[right]) {
            // 找到一个回文子串
            count++;

            // 继续向两边扩散
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        // 情况1：奇数长度回文
        // 例如 aba，以 b 为中心
        expand(i, i);

        // 情况2：偶数长度回文
        // 例如 aa，以两个 a 中间为中心
        expand(i, i + 1);
    }

    return count;
};
// @lc code=end



/*
// @lcpr case=start
// "abc"\n
// @lcpr case=end

// @lcpr case=start
// "aaa"\n
// @lcpr case=end

 */

