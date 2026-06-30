/*
 * @lc app=leetcode.cn id=200 lang=javascript
 * @lcpr version=30403
 *
 * [200] 岛屿数量
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    // 解题思路：DFS + 沉0
    const m = grid.length;
    const n = grid[0].length;

    let count = 0;

    function dfs(i, j){
        // 超出边界：跳过
        if(i < 0 || i >= m || j < 0 || j >= n){
            
        }
    }

    // 双层循环-遍历每个元素
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            count++;
            dfs(i, j);
        }
    }

    return count;
};
// @lc code=end



/*
// @lcpr case=start
// [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]\n
// @lcpr case=end

// @lcpr case=start
// [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]\n
// @lcpr case=end

 */

