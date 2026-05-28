/* 
    URL：https://xxx.com?a=1&b=2&c=hello%20world&a=3&flag
    解析成：
    {
        a: ["1", "3"],
        b: "2",
        c: "hello world",
        flag: true
    }

    核心：
        ? 后面的内容叫 query 参数
        & 分割每一组参数
        = 分割 key 和 value
        重复 key 要合并成数组
        没有 value 的参数，默认是 true
*/

// url 参数解析
function parseUrl(url){
    // 解题思路：用 split() 方法分割，得到数组

    // 初始化-结果对象
    const resObj = Object.create(null);

    // 1. 取出 ? 后面的参数部分(字符串)
    // split("?") 得到一个数组 ["https://xxx.com", "a=1&b=2"]
    const queryString = url.split("?")[1];

    // 2. 没有参数，直接返回空对象
    if(!queryString) return resObj;

    // 3. 用 & 分割每一组参数,得到结果数组["a=1", "b=2", "flag"]
    const queryArr = queryString.split("&"); 

    // 4. for...of...遍历每个参数
    for(const item of queryArr){
        // 5. 用  = 分割参数，得到 参数名key 和 参数值value
        const [key, value] = item.split("=");

        // 6. 如果 value 是 undefined,说明是参数没有值，当作true
        if(value === undefined){
            value = true;
        } else {
            // 7. 如果 value 存在，就解码
            // hello%20world => hello world
            value = decodeURIComponent(value);
        }

        // 8. 如果 key 已经存在，说明出现了重复参数,合并
        if(resObj.hasOwnProperty(key)){
            
        }
    }
}