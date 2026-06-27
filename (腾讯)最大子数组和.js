/*
 * @lc app=leetcode.cn id=53 lang=javascript
 * @lcpr version=30403
 *
 * [53] 最大子数组和
 * 注意： 子数组是连续的
 * 错误：❌（常规定义dp[i] 表示 nums[0..i] 这个前缀里的最大子数组和）
 * 
 * dp[i] = nums[0..i] 中的最大子数组和 ❌
 * 只告诉你：前 i 个元素里面，最大和是多少
 * 没告诉你：这个最大子数组是不是以 nums[i] 结尾
 * 
 * =》 对于“连续子数组”来说，能不能接上 nums[i+1]，取决于它是不是贴着右边界 nums[i]
 * ✅ dp[i] = 以 nums[i] 结尾的 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  // 解题思路：动态规划（dp定义要注意）
  if(nums.length === 0) return 0;

  // dp[i] : 表示 以 nums[i] 为结尾的 最大子数组和
  const dp = new Array(nums.length);
  dp[0] = nums[0];
  
  let result = -Infinity;

  for(let i = 1; i < nums.length; i++){
    // 转移状态矩阵：要不从nums[i]重开，要不从 nums[i-1] 接上
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
  }

  for(let i = 0; i < dp.length; i++){
    result = Math.max(result. dp[i]);
  }

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

