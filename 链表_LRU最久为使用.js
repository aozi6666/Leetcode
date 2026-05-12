// // LRU 缓存：HashMap + 双向链表（手写）
// get/put 均摊 O(1)
// 请你设计并实现一个满足  LRU (最近未使用) 缓存 约束的数据结构

const { DoubleSide } = require("three");

// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；
//          如果不存在，则向缓存中插入该组 key-value 。
//          如果插入操作导致关键字数量超过 capacity ，
//          则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行


// 示例：

// 输入
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// 输出
// [null, null, null, 1, null, -1, null, -1, 3, 4]

// 解释
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // 缓存是 {1=1}
// lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
// lRUCache.get(1);    // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2);    // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1);    // 返回 -1 (未找到)
// lRUCache.get(3);    // 返回 3
// lRUCache.get(4);    // 返回 4


// 双向链表数据结构
// 双向链表中的某个节点
function Node(key, value){
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
}

function DobuleList() {
    // 虚拟节点（头 + 尾）
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);

    // 双向链表的节点个数
    this.size = 0;

    // 初始化(头尾相连)
    this.head.next = this.tail;
    this.tail.prev = this.head;
}

// 双向链表原型上的一些 增删改查 方法
// 1) 双向链表 尾部（最新使用） 添加节点 x，时间 O(1)
DobuleList.prototype._addLast = function(x) {
    x.prev = this.tail.prev;
    x.next = this.tail;

    // 之前的尾节点指向 x
    this.tail.prev.next = x;
    this.tail.prev = x;

    // 节点个数 +1
    this.size++;
}

// 2) 删除 双向链表中的 某个节点x（x 一定存在）
DobuleList.prototype._remove = function(x){
    x.prev.next = x.next;
    x.next.prev = x.prev;

    // 节点个数 -1
    this.size--;
}
// 3) 删除 双向链表的 头节点第一个节点（最近未被使用），并返回该节点，时间 O(1)
DobuleList.prototype._removeFirst = function(){
    // 边界判断：空链表，返回null
    if(this.head.next === this.tail){
        return null;
    }

    const first = this.head.next;
    this._remove(first);  // 调用 删除方法
    return first;
}
// 4) 返回链表长度
DobuleList.protitype._getSize = function() {
    return this.size;
}

// LRUCache 数据结构
function LRUCache(capacity){
    // 用 map 存 key -> node
    this.map = new Map();
    // 新建一个双向链表
    this.cache = new DobuleList();
    // 容量
    this.cap = capacity;
}

//  LRUCache 方法
//  1) 变为最近使用的节点
LRUCache.prototype._makeRecently = function(key){
    // 获取节点（从map中）
    let x = this.map.get(key);
    // 先从链表中 删除这个节点
    this.cache._remove(x);
    // 将该节点再加入到链表的尾部（最近使用）
    this.cache._addLast(x);
}

// 2)添加 新节点 到尾部
LRUCache.prototype._addRecently = function(key, value){
    // 新建一个节点
    const x = new Node(key, value);
    // 添加尾部（最新使用）
    this.cache._addLast(x);
    // (重要)添加到 map 中
    this.map.set(key, x);
}

// 3) 删除某个节点
LRUCache.prototype.deleteKey = function(key) {
    // 获取该节点（从map中）
    const x = this.map.get(key);
    // 删除该节点
    this.cache._remove(x);
    // 删除 map 中的 key
    this.map.delete(key);
}
