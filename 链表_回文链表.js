/*
 * @lc app=leetcode.cn id=234 lang=javascript
 * @lcpr version=30403
 *
 * [234] 回文链表
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
 * @return {boolean}
 */
var isPalindrome = function(head) {
    // 解题本质：快慢指针找中间 + 反转链表
    if(head === null || head.next === null) return true;
 
    // 反转链表回调
    function reverse(head){
     if(head === null || head.next === null) return head;
     let prev = null;
     let cur = head;
     let next = head.next;
 
 
     while(cur !== null){
         cur.next = prev;
         prev = cur;
         cur = next;
         
         if(next !== null){
             next = next.next;
         }
     }
     return prev;
    }
 
    // 1. 快慢指针找中间节点
    let fast = head;
    let slow = head;
 
    while(fast !== null && fast.next !== null){
         fast = fast.next.next;
         slow = slow.next;
    }
 
    // 2. 反转 slow 之后的链表
    let newHead = reverse(slow);
 
     // 3. 判断
     while(newHead !== null){
         // 判断
         if(head.val !== newHead.val){
             return false;
         }
         head = head.next;
         newHead = newHead.next;
     }
     return true;
 };
// @lc code=end



/*
// @lcpr case=start
// [1,2,2,1]\n
// @lcpr case=end

// @lcpr case=start
// [1,2]\n
// @lcpr case=end

 */

