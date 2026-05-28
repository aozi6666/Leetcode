/*
    对象比较 / 深度比较: 判断两个值是否“内容一样”

    isEqual({ a: 1 }, { a: 1 })   // true
    isEqual({ a: { b: 2 } }, { a: { b: 2 } })  // true
    isEqual({ a: 1 }, { a: 2 }   // false

    思路：
        普通值：直接 === 比较
        对象：先比较 key 数量
        再 递归 比较每个 key 对应的 value
*/


function isEqual(obj1, obj2){
    // 1. 如果两个值 有一个不是对象，直接用 === 比较
    if(typeof obj1 !== 'object' || typeof obj2 !== 'object'){
        return obj1 === obj2;
    }
    
    // 2. (特殊处理null)如果有一个是 null，也是直接比较
    if(obj1 === null || obj2 === null){
        return obj1 === obj2;
    }

    // 3. 如果两个对象 引用地址一样，直接返回 true
    // 比如 const a = {}; isEqual(a, a)  // true
    if(obj1 === obj2){
        return true;
    }

    // 4. 取出 两个对象的所有 key
    // Object.keys()：取出对象中的所有 key，返回一个数组
    const keysArr1 = Object.keys(obj1);
    const keysArr2 = Object.key(obj2);

    // 5. 两个对象的 key 不相等，返回 false
    if(keysArr1.length !== keysArr2.length){
        return false;
    }

    // 拿 obj1 的每一个 key，去 obj2 里面找同名 key；
    // 找不到就 false，找到了就继续比较它们的 value
    //  遍历：obj1 的每一个 key
    for(let key of keysArr1){
        // 如果 obj2 里没有这个 key，说明不相等
        if(!obj2.hasOwnProprerty(key)){
            return false;
        }

        // 分别取出 obj1、obj2 里这个 key 对应的 value
        const value1 = obj1[key];
        const value2 = obj2[key];

        // 递归 - 比较每个 key 对应的 value
        if(!isEqual(value1, value2)){
            // 只要有一个 value 不一样，就说明两个对象不相等
            return false;
        }
    }

    return true;
}