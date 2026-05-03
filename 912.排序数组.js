/*
 * @lc app=leetcode.cn id=912 lang=javascript
 * @lcpr version=30403
 *
 * [912] 排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    // 本质：快速排序-构造二叉搜索树的过程

    // 1️⃣ 先打乱数组，避免最坏情况
    shuffle(nums);
    
    // 2️⃣ 排序整个数组
    quickSort(nums, 0, nums.length - 1);
    // 快速排序主函数
    var quickSort = function(nums, left, right) {
        // 递归结束条件
        if (left >= right) return;
    
        // 找到一个“正确位置”的元素，传递给 partition 的处理区间【left, right】
        var pivotIndex = partition(nums, left, right);
    
        // 排左边
        quickSort(nums, left, pivotIndex - 1);
    
        // 排右边
        quickSort(nums, pivotIndex + 1, right);
    };
    
    // 核心：把一个元素放到正确位置
    // 接收参数：[left, right] ✅ “当前要处理的范围边界”
    function partition(nums, start, end) {
        // 选第一个元素作为 pivot（基准）
        let pivot = nums[start];
    
        // （扫描）左右指针
        var left = start + 1;
        var right = end;
    
        while (true) {
            // 从左往右找 > pivot 的
            while (left <= right && nums[left] <= pivot) {
                left++;
            }
    
            // 从右往左找 <= pivot 的
            while (right >= start + 1 && nums[right] > pivot) {
                right--;
            }
    
            // 指针交错，结束
            if (left> right) break;
    
            // 交换两个位置
            [nums[left], nums[right]] = [nums[right], nums[left]];
        }
    
        // 把 pivot 放到正确位置
        [nums[start], nums[right]] = [nums[right], nums[start]];
    
        // 返回 pivot 的最终位置
        return right;
    };
    
    // 洗牌（打乱数组）
    var shuffle = function(nums) {
        for (let i = nums.length - 1; i > 0; i--) {
            // 在 0 ~ i 之间随机选一个
            const randomIndex = Math.floor(Math.random() * (i + 1));
    
            // 交换
            [nums[i], nums[randomIndex]] = [nums[randomIndex], nums[i]];
        }
    };
    
};
// @lc code=end



/*
// @lcpr case=start
// [5,2,3,1]\n
// @lcpr case=end

// @lcpr case=start
// [5,1,1,2,0,0]\n
// @lcpr case=end

 */

