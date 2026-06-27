/*
 * @lc app=leetcode.cn id=300 lang=javascript
 * @lcpr version=30403
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    // 解题思路： 动态规划
    // 定义dp: dp[i] 表示 以 nums[i]为结尾的最长递增子序列的长度
    // base case: dp[i] = 1, 因为以nums[i]为结尾的最长递增子序列长度至少为1
    const dp = new Array(nums.length).fill(1);
    let result = 0;

    // 状态转移矩阵：找 nums[i] 之前比 nums[i] 小的数，再上面加就行
    for(let i = 1; i < nums.length; i++){
        for(let j = 0; j < i; j++){
            if(nums[i] > nums[j]){
                dp[i] = Math.max(dp[i], dp[j + 1]);
            }
        }
    }

    // 更新结果，再dp数组中找最大值
    for(let i = 0; i < dp.length; i++){
        result = Math.max(result, dp[i])
    }

    return result;

};
// @lc code=end



/*
// @lcpr case=start
// [10,9,2,5,3,7,101,18]\n
// @lcpr case=end

// @lcpr case=start
// [0,1,0,3,2,3]\n
// @lcpr case=end

// @lcpr case=start
// [7,7,7,7,7,7,7]\n
// @lcpr case=end

 */

