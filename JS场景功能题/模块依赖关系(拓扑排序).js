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
    // 解题思路：DFS 深度优先遍历
    // 先递归处理当前模块的所有依赖 -> 等依赖都处理完了，再把当前模块放进结果里

    // 记录：哪些模块已经处理过了(集合:去重)
    const visited = new Set(); 
    const result = [];  // 结果数组
  
    // 深度优先遍历函数：处理某个模块
    function dfs(module) {
      // 如果这个模块已经处理过了，就直接返回
      if (visited.has(module)) {
        return;
  
      // 标记当前模块已经访问过
      visited.add(module);
  
      // 拿到当前模块的依赖 数组，把里面每个依赖模块都递归处理一遍
      // 如果没有，就给一个空数组
      const depsList = dependencies[module] || [];
  
      // 先递归处理所有依赖模块
      // for...of 遍历数组, 拿到 数组里的每一个值value
      for (const item of depsList) {
        dfs(item);
      }
  
      // 等依赖都处理完后，再把自己放进结果
      result.push(module);
    }
  
    // 遍历所有模块，把 dependencies 这个对象里的每个模块名都拿出来，依次做 DFS
    // 防止有些模块没被主链路访问到
    // for ... in 遍历对象, 拿到 键名key
    for (const moduleKey in dependencies) {
      dfs(moduleKey);
    }
  
    // 返回最终加载顺序
    return result;
}

console.log(getLoadOrder(dependencies)); // 输出: ["moduleC", "moduleB", "moduleA", "moduleD"]
  