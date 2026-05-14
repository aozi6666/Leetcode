/*
 * @lc app=leetcode.cn id=560 lang=javascript
 * @lcpr version=30403
 *
 * [560] 和为 K 的子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    // 解题思路：前缀和思想
    // 前缀和：0 - i 的和
    // 边界判断：
    if(nums.length === 0) return 0;
    // 最终个数
    let count = 0;
    let sum = 0;  // 当前和

    // key: 前缀和为key, value: 前缀和为key的个数
    const map = new Map();

    // 必须设置
    map.set(0, 1);

    // 遍历每个元素
    for(let num of nums){
        // 前缀和
        sum += num;

        // 
        if(map.has(sum - k)){
            count += map.get(sum - k);
        }
        // 存进map
        map.set(sum, (map.get(sum) || 0) + 1);
    }   

    return count;

};
// @lc code=end



/*
// @lcpr case=start
// [1,1,1]\n2\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3]\n3\n
// @lcpr case=end

 */

