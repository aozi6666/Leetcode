function quickSort(arr) {
    // 递归结束条件
    if(arr.length <= 1) return arr;

    // 初始化-中枢按钮:基准值
    const pivot = arr[0];
    // 初始化-左右区间
    const left = [];   const right = [];

    // 遍历-分区
    for(let i = 1; i < arr.length; i++){
        if(arr[i] <= pivot){
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

// 原地排序
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) return;
  
    const pivotIndex = partition(arr, left, right);

    function partition(arr, left, right) {
        const pivot = arr[right]; // 选最后一个作为基准
        let i = left;
      
        for (let j = left; j < right; j++) {
          if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
          }
        }
      
        [arr[i], arr[right]] = [arr[right], arr[i]];
        return i;
      }
  
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  
    return arr;
  }