/*
 * @lc app=leetcode.cn id=53 lang=javascript
 * @lcpr version=30403
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // dp[i] 表示 以 nums[i] 结尾的最大子数组和
    let dp = new Array(nums.length);

    dp[0] = nums[0];

    let result;

    for(let i = 1; i < nums.length; i++){
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    }

    result = Math.max(...dp);
    return result;
};
// @lc code=end



/*
// @lcpr case=start
// [-2,1,-3,4,-1,2,1,-5,4]\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

// @lcpr case=start
// [5,4,-1,7,8]\n
// @lcpr case=end

 */

