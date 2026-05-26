/*
对象扁平化：把对象里的层级路径，用 . 拼起来作为新 key
const source = {
  a: {
    b: {
      c: 1,
      d: 2
    },
    e: 3
  },
  f: {
    g: 2
  }
}
  
变成这种一层对象：
{
  "a.b.c": 1,
  "a.b.d": 2,
  "a.e": 3,
  "f.g": 2
}
*/


function objectFlat(obj = {}){
    // 解题思路：遇到普通值，把 路径 和 值 存起来；
    //         遇到对象，带着 当前路径继续往里找

    // 最终结果
    const res = {};
    /**
     * 递归函数
     * @param {Object} item 当前正在处理的对象
     * @param {String} preKey 当前对象前面的路径
     */
    function flatten(obj, preKey = ''){
        //  Object.entries(item) :把对象转成二维数组
        // 例如 { c: 1, d: 2 }  => [['c', 1], ['d', 2]]
        Object.entries(obj).forEach((item) => {
            // 拿到 每个 key 与 value
            const key = item[0];
            const value = item[1];

            // 拼接当前 key:之前有路径，用 点 拼起来,之前没有路径(是第一层)直接用 key
            const newKey = preKey ? `${preKey}.${key}` : key;

            // 如果 val 还是对象，继续递归
            if(value !== null && typeof value === 'object' && !Array.isArray(value)){
                // 递归
                flatten(value, newKey);
            } else {
                // 遇到普通值，把 值 存起来
                res[newKey] = value;
            }
        })
    }

    // 调用递归
    flatten(obj);

    // 返回结果
    return res;
}