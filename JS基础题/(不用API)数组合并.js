// 1. 合并数组：不用 concat / push
function mergeArray(arr1, arr2){
    const result = [];
    let index = 0;
    // 循环 arr1
    for(let i = 0; i < arr1.length; i++){
        result[index] = arr1[i];
        index++;
    }
    // 循环 arr2
    for(let j = 0; j < arr2.length; j++){
        result[index] = arr2[j];
        index++;
    }
    return result;
}