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
    let newHead = reverse(slow.next);
    // 反转不会自动断开原链表的连接，需要断链
    slow.next = null;

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

    // 3. 合并链表（交替）
    // 定义两个指针
    let p1 = head;
    let p2 = newHead;

    while(p2 !== null){
        // 每次进循环定义两个临时指针（指向下一个元素）
        let temp1 = p1.next;
        let temp2 = p2.next;

        // 拼接链表
        p2.next = p1.next;
        p1.next = p2;

        // 移动下一组
        p1 = temp1;
        p2 = temp2;
    }

    return head;


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

