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
    // 虚拟 头/尾节点
    const head = new ListNode();
    const tail = new ListNode();

    head.next = tail;
    tail.prev = head;
}

// 在构造函数上添加方法
// 在链表头部 添加节点
LRUCache.prototype.addToHead = function(node){
    node.prev = this.head;
    node.next = this.head.next;

    this.head.next.prev = node;
    this.head.next = node;
}

// 删除一个节点
LRUCache.prototype.removeNode = function(node){
    const prevNode = node.prev;

    prevNode.next = node.next;
    node.next.prev = prevNode;
}

// 访问节点并移动到头部
LRUCache.prototype.moveToHead = function(node){
    this.removeNode(node);
    this.addToHead(node);
}

// 实现get
LRUCache.prototype.get = function(key){
    if(!this.map.has(key)){
        return -1;
    }

    // 取出对应的节点
    const node = this.map.get(key);

    // 移动到头部（最新使用）
    this.moveToHead(node);

    // 返回节点值
    return node.value;
}

// 实现put
LRUCache.prototype.put = function(key, value){
    // 如果存在，更新，移动到头部
    if(this.map.get(key)){
        const node = this.map.get(key);

        node.value = value;
        this.moveToHead(node);

        return;
    }

    // 不存在，创建新节点，添加到头部
    // 创建新节点
    const newNode = new ListNode(key, value);

    // 当前已满(删除最后一个节点，并且更新map)
    if(this.map.size === this.capacity){
        const lastNode = this.tail.prev;

        this.removeNode(lastNode);
        this.map.delete(lastNode.key);
    } 

    // 添加到map
    this.map.set(key, newNode);

    // 添加到头部
    this.addToHead(newNode);
}