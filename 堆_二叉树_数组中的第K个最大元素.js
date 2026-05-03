/*
 * @lc app=leetcode.cn id=215 lang=javascript
 * @lcpr version=30403
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    // 快速选择：只走一边

    // 1. 打乱数组
    shuffle(nums);
    
    // 定义左右指针
    let left = 0;
    let right = nums.length - 1;

    // 把“第 k 大” 变成：“第 k 小（升序第 k 个）”
    // 就是排序后，从小到大，要得到第 K 大，需要找到 倒数第 k 个元素
    // 得到的是 正确排序后的 目标target下标位置
    let target = nums.length - k;

    // 循环
    while(left <= right){
        // 获得 “正确位置”的元素索引
        let pivotIndex = partition(nums, left, right);

        // 当前这个比 taget 小，去右边找
        if(pivotIndex < target){
            left = pivotIndex + 1;
        }
        // 当前这个比 taget 大，去左边找
        else if(pivotIndex > target){
            right = pivotIndex - 1;
        } 
        else{
            // 找到目标元素
            return nums[pivotIndex];
        }
    }

    return -1;

};
// @lc code=end



/*
// @lcpr case=start
// [3,2,1,5,6,4]\n2\n
// @lcpr case=end

// @lcpr case=start
// [3,2,3,1,2,4,5,5,6]\n4\n
// @lcpr case=end

 */

