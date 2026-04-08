/*
 * @lc app=leetcode.cn id=55 lang=javascript
 * @lcpr version=30403
 *
 * [55] 跳跃游戏
 */

const { flattenJSON } = require("three/src/animation/AnimationUtils.js");

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    // 贪心选择: 能够通过 局部最优解 直接推导 出全局最优解
    // 边界判断
    if(nums.length === 0) return false;
    // 记录 当前 能够到达的最远位置(累积得到的)
    let max_reach = 0;

    for(let i = 0; i < nums.length; i++) {
        max_reach = Math.max(max_reach, i + nums[i]);

        // 当遍历到当前位置 i 时，如果我当前能到达的最远位置 max_reach 连 i 都到不了，
        // 那后面更不可能到了，直接返回 false
        // 应该拿 当前位置 i 和 当前最远可达位置 max_reach 比
        if(max_reach <= i) {
            return false;
        }
    }

    return max_reach >= nums.length;

};
// @lc code=end



/*
// @lcpr case=start
// [2,3,1,1,4]\n
// @lcpr case=end

// @lcpr case=start
// [3,2,1,0,4]\n
// @lcpr case=end

 */

