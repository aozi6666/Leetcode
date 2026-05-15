/*
 * @lc app=leetcode.cn id=347 lang=javascript
 * @lcpr version=30403
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 * Map.entries(): 得到 Map 里的所有键值对
 *          - 返回一个 Iterator（可迭代对象） [1, 3] [2, 2] [3, 1]
 *          - Array.from()：把“可迭代对象”转成 真正 二维数组
 */
var topKFrequent = function(nums, k) {
    // 哈希表 + 堆/排序
    // 创建一个 Map 用来统计元素出现次数
    // key: 数字， value: 出现次数
    const freqMap = new Map();

    // 遍历数组，统计每个元素出现频率
    for (const num of nums) {
        // 更新map
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // 将 Map 转成数组
    // 例如：
    // Map(3) {1 => 3, 2 => 2, 3 => 1}
    // 转成：[[1,3], [2,2], [3,1]]
    const entries = Array.from(freqMap.entries());

    // 按照出现次数进行降序排序
    // b[1] - a[1] 表示从大到小
    entries.sort((a, b) => b[1] - a[1]);

    // 截取前 k 个元素,  slice(0, k) 取前 k 项
    const topK = entries.slice(0, k);

    // 只返回数字本身
    // 每项格式为 [数字, 次数]
    // entry[0] 就是数字
    return topK.map(entry => entry[0]);
};
// @lc code=end



/*
// @lcpr case=start
// [1,1,1,2,2,3]\n2\n
// @lcpr case=end

// @lcpr case=start
// [1]\n1\n
// @lcpr case=end

// @lcpr case=start
// [1,2,1,2,1,2,3,1,3,2]\n2\n
// @lcpr case=end

 */

