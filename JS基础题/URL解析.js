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

    let value;

    // 4. for...of...遍历每个参数
    for(const item of queryArr){
        // 5. 用  = 分割参数，得到 参数名key 和 参数值value
        const [key, rawValue] = item.split("=");

        // 6. 如果 value 是 undefined,说明是参数没有值，当作true
        if(rawValue === undefined){
            value = true;
        } else {
            // 7. 如果 value 存在，就解码
            // hello%20world => hello world
            value = decodeURIComponent(rawValue);
        }

        // 8. 如果 key 已经存在(分第二次和更多次)，说明出现了重复参数,合并
        if(Object.prototype.hasOwnProperty.call(resObj, key)){
            // 取出 key 对应的 旧value
            const oldValue = resObj[key];

            // 如果 旧value 已经是数组，直接push
            if(Array.isArray(oldValue)){
                oldValue.push(value);
            } else {
                // 旧value 不是数组(第二次出现)，就变成数组
                resObj[key] = [oldValue, value];
            }
        } else {
            // key 之前没出现过，存key-value
            resObj[key] = value;
        }
    }

    return resObj;
}

function parseurl(url){
    // 解题思路：使用字符串split做切割
    const reslutObj = Object.create(null);

    const targetPar = url.split('?');
    const queryString = targetPar[1];

    if(!queryString) return;

    // 参数数组.[a=1, b=2]
    const queryArr = queryString.split('&');

    for(let item of queryArr){
        const [key, rawValue] = item.split('=');

        if(!rawValue){
            value = true;
        } else {
            const value = encodeURIComponent(rawValue);
        }

        if(Object.prototype.hasOwnProperty.call(reslutObj, key)) {
            const oldValue = reslutObj[key];


            if(Array.isArray(oldValue)){
                reslutObj[key].push(value);
            } else {
                reslutObj[key] = [oldValue, value];
            }

        } else {
            reslutObj[key] = value;
        }
    }

    
}