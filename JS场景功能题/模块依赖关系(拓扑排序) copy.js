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
  // 解题思路：DFS深度优先遍历
  // set集合去重，先递归处理当前模块的所有依赖，依赖的处理完了，再将当前放入结果

  const visited = new Set();
  const result = [];

  // DFS遍历函数（处理模块）
  function dfs(module){
    // 重要：处理过了直接返回
    if(visited.has(module)){
      return;
    }

    // 每次处理前，先标记已经访问过了
    visited.add(module);

    // 拿到 key 依赖的 数组
    const desList = dependencies[module] || [];

    // 递归处理。依赖数组中的 模块
    for(const item of desList){
      dfs(item);
    }

    // 等所有依赖处理完，将本身加入到 结果
    result.push(module);
  }

  // 遍历所有模块，依次传入
  // for...in ：拿到的是键名key
  for(const module in dependencies){
    // 调用
    dfs(module);
  }

  return result;
}

console.log(getLoadOrder(dependencies)); // 输出: ["moduleC", "moduleB", "moduleA", "moduleD"]
  