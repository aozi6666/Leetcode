/* 
    给定一个对象 dependencies，表示模块之间的依赖关系：
     - 键：模块名
     - 值：当前模块依赖的模块数组

    返回一个模块加载顺序数组（满足依赖关系的加载顺序）
    ====每个模块都必须在它 依赖的模块 加载完成之后，才能加载自己====

    拓扑排序：在一堆有先后依赖关系的任务里，排出一个合法顺序
*/

const dependencies = {
    moduleA: ["moduleB", "moduleC"],
    moduleB: ["moduleC"],
    moduleC: [],
    moduleD: ["moduleA", "moduleB"]
  };
  
function getLoadOrder(dependencies) {
  // 结果数组
  const result = [];
  // 集合（带去重）：存在访问过的模块
  const visited = new Set();

  function dfs(module){
    // 判断是否访问过
    if(visited.has(module)){
      return;
    }
    
    // 没访问过就加入访问模块
    visited.add(module);

    // 拿 module 对应的value数组
    const depsList = dependencies[module] || [];

    // 遍历每个数组中的模块
    for(let item of depsList){
      dfs(item);
    }

    // 等所以模块处理完了，把自己放入结果中
    result.push(module);
  }

  // 遍历 dependencies，拿到key
  for(let module in dependencies){
    dfs(module);
  }

}

console.log(getLoadOrder(dependencies)); // 输出: ["moduleC", "moduleB", "moduleA", "moduleD"]
  