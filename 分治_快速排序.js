function quickSort(arr) {
    // 递归终止条件
    if (arr.length <= 1) return arr;
  
    const pivot = arr[0]; // 基准值
    const left = [];
    const right = [];
  
    // 分区
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
