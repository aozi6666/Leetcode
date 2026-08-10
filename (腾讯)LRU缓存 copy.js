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

// 双向链表数据结构
function ListNode(key, value){
    this.key = key === undefined ? null : key;
    this.value = value === undefined ? null : value;

    this.next = null;
    this.prev = null;
}

// 构造函数
var LRUCache = function(capacity) {
    this.capacity = capacity;

    // map(key: 节点的key, value: 节点本身)
    this.map = new Map();

    // 创建 首尾结点
    this.head = new ListNode();
    this.tail = new ListNode();

    this.head.next = this.tail;
    this.tail.prev = this.prev;
}

// 在构造函数上添加原型方法

// 1)头部添加节点
LRUCache.prototype.addHead(node) {
    node.next = this.head.next;
    node.prev = this.head;

    this.head.next.prev = node;
    this.head.next = node;
}

// 2) 删除一个节点
LRUCache.prototype.remove(node){
    // 取得删除节点的头一个
    const prevNode = node.prev;

    node.next.prev = prevNode;
    prevNode.next = node.next;
}

// 3) 移动一个节点到头部
LRUCache.prototype.moveHead(node){
    this.remove(node);
    this.addHead(node);
}

// 最终要实现的 get/set
LRUCache.prototype.get(key){
    if(!map.has(key)){
        return -1;
    }

    // 从 map 中，取出节点Ndoe
    const tarNode = this.map.get(key);

    // 移动到头部
    this.moveHead(tarNode);
    return tarNode.value;
}

LRUCache.prototype.put(key, value){
    if(this.map.has(key)){
        
        // 取出对应元素
        const tarNode = this.map.get(key);

        tarNode.value = value;
        this.map.set(key, tarNode);
        this.moveHead(tarNode);

        return;
    }

    // 不存在时，先判断容量
    if(this.map.set >= this.capacity){
        // 删除 队尾元素
        this.remove(this.tail.prev);
        this.map.delete(this.tail.prev.key);
    }

    const newNode = new ListNode(key, value);
    this.map.set(key, newNode);
    this.addHead(newNode);
    return;
}