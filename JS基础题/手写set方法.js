/*
实现 一个set方法：支持根据路径设置对象的属性值

const obj = {
  a: {
    b: { c: 1 },
    f: 2
  },
  d: {
    e: 3
  }
};

set(obj, ['a', 'b', 'c'], 100);
console.log(obj.a.b.c); // 100

set(obj, ['d', 'e'], 300);
console.log(obj.d.e); // 300
*/

// 方式1: 循环版本
function set(obj, keyPaths, value){
    let cur = obj;

    // 循环
    for(let i = 0; i < keyPaths.length; i++){
        // 获取每次的路径
        const key = keyPaths[i];

        // 如果是最后一个 key，直接赋值
        if(i === keyPaths.length - 1){
            cur[key] = value;
        } else {
            // 如果下一层不存在，先创建一个空对象
            if (cur[key] === undefined || cur[key] === null) {
                cur[key] = {};
            }

            // 不是最后一个 key，继续循环
            cur = cur[key];
        }
    }

    return obj;
}