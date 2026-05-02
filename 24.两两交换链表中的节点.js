/*
 * @lc app=leetcode.cn id=24 lang=javascript
 * @lcpr version=30403
 *
 * [24] 两两交换链表中的节点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    // 解题思路：递归 + reverseN 思想

    // 回调：反转 N 个节点的链表
    function reverseN(head, n){
        if(n === 1){
            return head;
        }
        if(head !== null || head.next === null){
            return head;
        }

        // 定义三个指针
        let cur = head;
        let pre = null;
        let next = head.next;

        // 循环： 遍历 n 个节点
        while(n > 0){
            cur.next = pre;
            pre = cur;
            cur = next;
            if(next !== null){
                next = next.next;
            }
            n--;
        }
        
    }
    
};
// @lc code=end



/*
// @lcpr case=start
// [1,2,3,4]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3]\n
// @lcpr case=end

 */

