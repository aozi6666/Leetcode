/*
 * @lc app=leetcode.cn id=19 lang=javascript
 * @lcpr version=30403
 *
 * [19] 删除链表的倒数第 N 个结点
 */

const { h } = require("vue");

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
 * @param {number} n
 * @return {ListNode}
 */
function ListNode(val, next){
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
var removeNthFromEnd = function(head, n) {
    // 解题思路：找到 倒数第 n+1 个节点，并删除该节点.next

    if(head === null){
        return null;
    }

    // 定义一个虚拟头节点
    let dummy = new ListNode(0);
    // 先连上
    dummy.next = head;

    // 找倒数第 k 个节点的回调
    function findFromEnd(head, k){
        // 实现关键：第一个指针走 k 步，然后让 第二个指针从头开始走
        //         当第一个指针到达末尾null时，第二个指针指向的节点就是倒数第 k 个节点
        if(head === null){
            return null;
        }

        // 定义先出发的指针
        let p1 = head;
        // 先走 k 步
        for(let i = 0; i < k; i++){
            p1 = p1.next;
        }
        // 然后定义第二个指针，从头走
        let p2 = head;

        // 同时走：直到 p1 为 null
        while(p1 !== null){
            p1 = p1.next;
            p2 = p2.next;
        }
        //  p2 现在指向第 n - k + 1 个节点，即倒数第 k 个节点
        return p2;
    }

    // 找到倒数第 k + 1 个节点
    // ! 这里一定要从 dummy 开始找，因为如果要删除 第 1个节点，需要找到 dummy
    // dummy 虽然在“最前面”，但不影响“倒数位置”
    let indexNode = findFromEnd(dummy, n + 1);

    // 删掉倒数第 n 个节点
    indexNode.next = indexNode.next.next;
    
    // 返回结果
    return dummy.next;
};
// @lc code=end

function ListNode(val){
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next; 
}

function removeNthFromEnd2(head, n){
    // 解题思路：找到倒数第 k+1个节点，删除
    if(head === null){
        return;
    }

    // 创建虚拟头节点
    const dummy = new ListNode(0);
    dummy.next = head;


    let indexNode = findK(dummy, n + 1);

    // 删除
    indexNode.next = indexNode.next.next;

    return dummy.next;

    function findK(head, k){
        // 快慢指针
        if(head === null) return null;

        let p1 = head;

        for(let i = 0; i < k; i++){
            p1 = p1.next;
        }

        let p2 = head;

        while(p1 !== null){
            p1 = p1.next;
            p2 = p2.next;
        }

        return p2;
    }
}


/*
// @lcpr case=start
// [1,2,3,4,5]\n2\n
// @lcpr case=end

// @lcpr case=start
// [1]\n1\n
// @lcpr case=end

// @lcpr case=start
// [1,2]\n1\n
// @lcpr case=end

 */

