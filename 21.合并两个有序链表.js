/*
 * @lc app=leetcode.cn id=21 lang=javascript
 * @lcpr version=30403
 *
 * [21] 合并两个有序链表
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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

function ListNode(val, next){
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
var mergeTwoLists = function(list1, list2) {
    // 解题思路：双指针 + 虚拟头结点 dummy

    // 创建虚拟头节点
    let dummy = new ListNode(0);
    // 指针p,指向虚拟头节点
    let p = dummy;

    // 定义双指针
    let p1 = list1;
    let p2 = list2;

    //循环构建链表: 只有两个都存在，才能比较大小。(有一个不存在，另一个直接整个添加)
    while(p1 !== null && p2 !== null){
        // 每次把小的值接到 p 的后面
        if(p1.val < p2.val){
            p.next = p1;
            p1 = p1.next;
        } else if( p1.val >= p2.val){
            p.next = p2;
            p2 = p2.next;
        }

        // 每次接完之后，p 需要向后移动
        p = p.next;
    }

    // 某一个链表为空后，直接全部添加剩余的链表
    if(p1 !== null){
        p.next = p1;
    }
    if(p2 != null){
        p.next = p2;
    }

    // 返回虚拟头节点的 next
    return dummy.next;

};
// @lc code=end



/*
// @lcpr case=start
// [1,2,4]\n[1,3,4]\n
// @lcpr case=end

// @lcpr case=start
// []\n[]\n
// @lcpr case=end

// @lcpr case=start
// []\n[0]\n
// @lcpr case=end

 */

