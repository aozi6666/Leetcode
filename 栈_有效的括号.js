/*
 * @lc app=leetcode.cn id=20 lang=javascript
 * @lcpr version=30403
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];

    // 括号映射
    const map = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    for (let char of s) {
        // 如果是右括号
        if (map[char]) {
            // 栈为空 或 不匹配
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            // 左括号入栈
            stack.push(char);
        }
    }

    // 最后栈必须为空
    return stack.length === 0;

};
// @lc code=end



/*
// @lcpr case=start
// "()"\n
// @lcpr case=end

// @lcpr case=start
// "()[]{}"\n
// @lcpr case=end

// @lcpr case=start
// "(]"\n
// @lcpr case=end

// @lcpr case=start
// "([])"\n
// @lcpr case=end

// @lcpr case=start
// "([)]"\n
// @lcpr case=end

 */

