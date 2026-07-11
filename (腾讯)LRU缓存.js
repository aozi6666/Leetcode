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

// 双向链表节点
function ListNode(key, value) {
    this.key = key === undefined ? 0 : key;
    this.value = value === undefined ? 0 : value;
    this.prev = null;
    this.next = null;
}

// 构造函数（里面都用this）
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.map = new Map();

    // 虚拟头尾节点，避免处理空链表、头尾边界
    this.head = new ListNode();
    this.tail = new ListNode();

    this.head.next = this.tail;
    this.tail.prev = this.head;
};

/**
 * 把 node 从链表中删除
 * @param {Object} node
 */
LRUCache.prototype.removeNode = function(node) {
    const prevNode = node.prev;
    const nextNode = node.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
};

/**
 * 把 node 插到 head 后面，表示最近使用
 * @param {Object} node
 */
LRUCache.prototype.addToHead = function(node) {
    const firstNode = this.head.next;

    node.prev = this.head;
    node.next = firstNode;

    this.head.next = node;
    firstNode.prev = node;
};

/**
 * 把 node 移动到头部
 * @param {Object} node
 */
LRUCache.prototype.moveToHead = function(node) {
    this.removeNode(node);
    this.addToHead(node);
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (!this.map.has(key)) {
        return -1;
    }

    const node = this.map.get(key);

    // 访问过，变成最近使用
    this.moveToHead(node);

    return node.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.map.has(key)) {
        const node = this.map.get(key);

        node.value = value;
        this.moveToHead(node);

        return;
    }

    // 先淘汰最久未使用的节点，避免链表瞬时超出容量
    if (this.map.size === this.capacity) {
        const leastUsedNode = this.tail.prev;

        this.removeNode(leastUsedNode);
        this.map.delete(leastUsedNode.key);
    }

    const newNode = new ListNode(key, value);

    this.map.set(key, newNode);
    this.addToHead(newNode);
};
