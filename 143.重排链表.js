/*
 * @lc app=leetcode.cn id=143 lang=javascript
 * @lcpr version=30403
 *
 * [143] 重排链表
 */

const { handleError } = require("vue");

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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    // 解题思路： 快慢指针找中点 + 反转链表 + （交替）合并链表
    // 边界判断
    if(head === null || head.next === null){
        return head;
    }

    // 1. 快慢指针找中点
    let slow = head;
    let fast = head;

    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;
    }

    // 2. 反转链表中点之后的链表
    reverse(slow.next);

    // 反转链表回调
    function reverse(head){
        // 本质：3指针 + 递归
        if(head === null || head.next === null){
            return head;
        }

        let cur = head;
        let pre = null;
        let next = head.next;

        // 循环
        while(cur !== null){
            cur.next = pre;
            pre = cur;
            cur = next;
            if(next !== null){
                next = next.next;
            }
        }

        return pre;
    }

};
// @lc code=end



/*
// @lcpr case=start
// [1,2,3,4]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3,4,5]\n
// @lcpr case=end

 */

