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
  
function getLoadOrder(dependencies){
  const visited = new Set();
  const result = [];

  // 遍历所有 模块，用 键名key 依次做 DFS 深度优先遍历
  for(let moduleKey in dependencies){
    dfs(moduleKey);
  }

  return result;

  // 深度优先遍历函数：处理某个模块
  // 参数: 为 模块名 （键名key）
  function dfs(module){
    // 如果这个模块已经处理过了，就直接返回
    if(visited.has(module)){
      return;
    }

    // 将当前模块加入到 已处理模块集合
    visited.add(module);

    // 拿到当前模块的依赖 数组
    const depsList = dependencies[module] || [];

    // 先递归处理所有依赖模块
    for(let item of depsList){
      dfs(item);
    }

    // 等依赖都处理完后，再把自己放进结果
    result.push(module);
  }

}

console.log(getLoadOrder(dependencies)); // 输出: ["moduleC", "moduleB", "moduleA", "moduleD"]
  