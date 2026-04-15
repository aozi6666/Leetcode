/*
    redeuce数组方法
    arr.reduce(function(acc, cur, index, array){
        ... 每轮处理逻辑
        return acc;
    }, [初始值])
*/ 

const dataList = [
    { name: 'aa', country: 'China' },
    { name: 'bb', country: 'China' },
    { name: 'cc', country: 'USA' },
    { name: 'dd', country: 'EN' }
];

function reduceSort(list){
   return list.reduce(function(acc, cur){
      // 取出 当前项的 country 值
      const country = cur.country;

      // 如果 acc 里还没有 country ，就先建一个空数组
      if(!acc[country]){
        acc[country] = [];
      }

      // 把当前项 push 到 country 值对应的数组中
      acc[country].push(cur);

      return acc;
   }, {})
}

console.log(reduceSort(dataList));