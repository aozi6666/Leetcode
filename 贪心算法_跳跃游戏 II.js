/*
 * @lc app=leetcode.cn id=45 lang=javascript
 * @lcpr version=30403
 *
 * [45] 跳跃游戏 II
 */

const { flattenJSON } = require("three/src/animation/AnimationUtils.js");

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    // 解题本质：区间 + 贪心
    // 贪心本质：只需要每次选择那个最有潜力的局部最优解，最终就能得到全局最优解
    // 边界判断
    // 只有一个元素，直接返回0
    if(nums.length <= 1) return 0;
    
    // 初始化
    let jumps = 0;
    // 初始化区间: end 表示 当前 jumps 次跳跃所能覆盖的最右边界
    let end = 0;
    // 表示从 [i, end] 区间内起跳，可以跳到的最远索引
    let far_search = 0;

    // 遍历
    for(let i = 0; i < nums.length; i++){
        // 循环变量 i 正在从左到右扫描整个数组里的所有位置
        far_search = Math.max(far_search, i + nums[i]);

        // 扫到当前层右边界 end 时，说明这一层结束
        if(i === end) {
            // 需要再跳一次
            jumps++;
            // 更新右边界,继续扫下一层
            end = far_search;
            if(end >= nums.length - 1) {
                return jumps;
            }
        }
    }

    // 遍历完达不到
    return -1;
};
// @lc code=end



/*
// @lcpr case=start
// [2,3,1,1,4]\n
// @lcpr case=end

// @lcpr case=start
// [2,3,0,1,4]\n
// @lcpr case=end

 */

