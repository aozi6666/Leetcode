// 2. 数组去重：不用 Set / includes / indexOf
function uniqueArray(arr){
    const result = [];
    let index = 0;

    // 双层循环: 手动去重
    for(let i = 0; i < arr.length; i++){
        // 初始化一个 指标元素boolean
        let isExist = false;

        // 第二层循环
        for(let j = 0; j < result.length; j++){
            if(arr[i] === result[j]){
                isExist = true;
                break;
            }
        }

        // 添加元素到 result
        if(!isExist){
            result[index] = arr[i];
            index++;
        }
    }
    return result;
}