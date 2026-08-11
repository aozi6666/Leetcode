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

  function dfs(module){

    // 访问过，直接返回
    if(visited.has(module)){
      return;
    }

    // 标记访问过
    visited.add(module);

    // 取出 moudle 对应的数组
    const dependList = dependencies[module] || [];

    // 循环遍历数组
    for(let item of dependList){
      dfs(item);
    }

    // 将当前模块加入结果
    result.push(module);

  }

  // 递归：用模块名key传入
  for(let module in dependencies){
    dfs(module);
  }
  
  return result;
}

console.log(getLoadOrder(dependencies)); // 输出: ["moduleC", "moduleB", "moduleA", "moduleD"]
  