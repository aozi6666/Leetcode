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
    
    // 边界判断：不足2个，直接返回 原链表（递归也用）
    if(head === null || head.next === null){
        return head;
    }

     // 回调：反转 N 个节点的链表
     function reverseN(head, n){
        if(n === 1){
            return head;
        }
        if(head === null || head.next === null){
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
        // 此时的 cur 是第 n + 1 个节点，head 是反转后的尾结点
        head.next = cur;
        return pre;
    }

    // 调用 反转 2 个节点的函数，需要接住反转后的头结点（最终链表的头结点）
    let newHead = reverseN(head, 2);

    // 递归： 递归调用，返回，反转后的头结点
    // 此时：
    // 原来的 head 已经变成第二个节点
    // 它的 next 指向的是后面的链表起点

    // 递归处理后面的链表
    // ! 一定要用 原来的head接住，要是错用 newHead 会形成全部反转
    head.next = swapPairs(head.next);

    // 返回最终的链表
    return newHead;
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

