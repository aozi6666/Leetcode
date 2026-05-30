/* LRU 的规则是：
    - 最近用过的放最前面，最久没用的放最后面。
    - get 和 put 都算“使用”

    实现思路：
    1. 用 Map 存：key -> 链表节点
    通过 key 找节点是 O(1)

    2. 双向链表维护使用顺序： 保证删除节点和移动节点也是 O(1)
        - 头部：最近使用
        - 尾部：最久未使用

        链表节点存：
            - key
            - value
            - next
            - prev


    4. 放两个虚拟节点 在双向链表头部和尾部
*/

/**
 * @param {number} capacity
 */


// 双向链表节点定义(key, value, prev, next)
function ListNode(key, value){
    this.key = key === undefined ? 0 : key;
    this.value = value === undefined ? 0 : value;
    this.prev = null;
    this.next = null;
}

// 构造函数
var LRUCache = function(capacity) {
    this.capacity = capacity;
    // 初始化一个map
    const map = new Map();

    // 初始化一个双向链表
    const head = new ListNode();
    const tail = new ListNode();

    head.next = tail;
    tail.prev = head;
}

// 在构造函数上添加方法
// 在链表头部 添加节点
LRUCache.prototype.addToHead = function(node){
    
}