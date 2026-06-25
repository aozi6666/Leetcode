/* 
    给定一个对象 dependencies，表示模块之间的依赖关系：
     - 键：模块名
     - 值：当前模块依赖的模块数组

    返回一个 模块加载顺序数组（满足依赖关系的加载顺序）
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
  // 解题思路：BFS 广度优先遍历
  const result = [];

  const visited = new Set();

  function dfs(module){
    // 如果这个模块已经处理过了，就直接返回(结束递归)
    if(visited.has(module)){
      return;
    }

    // 每次进来一个模块：标记当前模块已经访问过
    visited.add(module);

    // 拿到当前模块的依赖 数组，把里面每个 依赖模块 都递归处理一遍
    const depsArr = dependencies[module] || [];

    for(let item of depsArr){
      dfs(item);
    }

    // 等依赖都处理完了，再把自己放进结果
    result.push(module);
  }

  // 遍历所有模块，用 键名key 依次做 BFS 广度优先遍历
  for(let moduleKey in dependencies){
    dfs(moduleKey);
  }

  return result;

}

console.log(getLoadOrder(dependencies)); // 输出: ["moduleC", "moduleB", "moduleA", "moduleD"]
  