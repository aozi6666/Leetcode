/*
 *
 *  堆排序（大顶堆/小顶堆） -- 本质：种特殊的完全二叉树
 * 特点：时间复杂度：O(nlogn)、空间复杂度：O(1)，是否稳定：不稳定
 *   - 大顶堆：每个父节点都 >= 它的子节点
 * 
 * 数组： [9, 6, 8, 3, 5, 1]
 *        9
        /   \
        6     8
       / \   /
      3   5  1
 * 关系： 
      left = 2 * i + 1;      // 左孩子
      right = 2 * i + 2;     // 右孩子
      parent = Math.floor((i - 1) / 2); // 父节点
      
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var heapSort = function(nums) {
    // 解题思路：1. 先把 数组原地 建成大顶堆（大顶堆的堆顶一定是当前最大值）
    // 2. 每次把 堆顶元素 和 当前堆的最后一个元素 交换（把最大值放到最终位置）
    // 3. 交换后缩小堆的范围，再对堆顶做下沉调整，，恢复大顶堆性质 
    // 重复 2. 3

    // 数组长度
    const n = nums.length;

    // 交换数组
    function swap(i, j){
        const temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    // 下沉操作：保证当 前节点符合 大顶堆的性质
    // nums[i] 可能比它的孩子小，=> 需要把 nums[i] 向下调整到合适位置。(与最大孩子交换)
    function siftDown(i, heapSize){
        // i 当前要下沉的 节点下标
        // heapSize 堆的大小(后面需要不断缩小)


        // 循环（为了处理下沉多层）
        while(true){
            let max = i;     // 先假设当前节点 i 是最大值

            // 获取 左右孩子 下标
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            // 左孩子存在，左孩子比当前节点 值还大
            if(left < heapSize && nums[left] > nums[max]){
                max = left;
            }

            // 右孩子存在，右孩子比当前节点 值还大
            if(right < heapSize && nums[right] > nums[max]){
                max = right;
            }

            // 如果 max 没有被交换
            // 说明： 当前子树已经满足大顶堆性质，不需要继续调整
            if(max === i){
                break;
            } else {
                // 需要交换 正确的节点
                swap(i, max);
                // 继续下沉(原来的 nums[i] 被换到了 max 位置)
                // 可能还需要继续向下沉-多层（继续检查“掉下去的那个元素”）
                i = max;
            }
        }
    }

    // 1. 建大顶堆：从最后一个 非叶子节点 开始,到 根节点
    // 叶子节点在数组中的范围 [Math.floor(n / 2), n - 1]
    for(let i = Math.floor(n / 2); i >= 0; i--){
        // 下沉操作（保证这个节点符合 大顶堆的性质）
        siftDown(i, n);
    }

    // 2. 重复，把 堆顶最大值放到数组末尾 
    //  缩小堆的范围，对 堆顶做下沉调整
    for(let j = n - 1; j > 0; j--){
        // 交换 最大值和 最后一个元素
        swap(0, j);

        // 缩小堆的范围,对换到堆顶的元素 做 下沉调整
        siftDown(0, j);
    }

    return nums;
}
