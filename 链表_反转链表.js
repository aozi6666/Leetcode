/*
 * @lc app=leetcode.cn id=206 lang=javascript
 * @lcpr version=30403
 *
 * [206] 反转链表
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
var reverseList = function(head) {
    // 题目本质： 链表指针操作
    // 核心思路：遍历过程中 维持 两段链表的 连接关系
    // 1. 边界判断
    if(head === null || head.next === null) return head;
    
    // 2. 定义链表指针
    let cur = head;  // 当前 需要处理 的节点
    let prev = null;  // 指向 已经反转链表 的头部

    // 遍历：逐个元素反转链表
    while(cur !== null) {
        // 1) 维持下一个节点
        const next = cur.next;

        // 2）反转当前节点
        cur.next = prev;
        
        // 3) 换节点,指针后移
        prev = cur;
        cur = next;
    }

    // 结束返回 prev 指向新链表头节点
    return prev;
};
// @lc code=end



/*
// @lcpr case=start
// [1,2,3,4,5]\n
// @lcpr case=end

// @lcpr case=start
// [1,2]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

 */

