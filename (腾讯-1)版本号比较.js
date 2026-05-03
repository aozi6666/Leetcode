/*
 * @lc app=leetcode.cn id=165 lang=javascript
 * @lcpr version=30403
 *
 * [165] 比较版本号
 */

// @lc code=start
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */

// 方法一：分割字符串(可以用split方法)
var compareVersion = function(version1, version2) {
     // 按照 . 分割字符串
     const v1 = version1.split('.');
     const v2 = version2.split('.');

     // 得到 循环次数(取两个数组的最大长度)
     const maxLength = Math.max(v1.length, v2.length);

     // 循环比较
     for(let i = 0; i < maxLength; i++){
        // 取出 每 字符串的数字进行比较
        const num1 = Number(v1[i] || 0);
        const num2 = Number(v2[i] || 0);

        if(num1 > num2) return 1;
        else if(num1 < num2) return -1;
     }
     return 0;
};

// 方法二：双指针(不可以用split方法)
// ASCII 码 0 的 码值是 48
var compareVersion = function(version1, version2) {
    let i = 0;
    let j = 0;
    const m = version1.length;
    const n = version2.length;
  
    // 循环比较
    while (i < m || j < n) {
      // 每次遇到 . 时，进入循环时要初始化，再比较
      let num1 = 0;
      let num2 = 0;
  
      while (i < m && version1[i] !== '.') {
        // 把字符串数字转成整数
        // version1.charCodeAt(i) 得到 字符串的 ASCII 码
        // version1.charCodeAt(i) - 48 得到 字符串的数字
        num1 = num1 * 10 + (version1.charCodeAt(i) - 48);
        i++;
      }
  
      while (j < n && version2[j] !== '.') {
        num2 = num2 * 10 + (version2.charCodeAt(j) - 48);
        j++;
      }
  
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
      
      // 相同时，继续比较 下一组 . 之后的字符串
      if(num1 === num2) {
        // i 和 j 都后移一位
        i++;
        j++;
      }
    }
  
    return 0;
  };
  
// @lc code=end



/*
// @lcpr case=start
// "1.2"\n"1.10"\n
// @lcpr case=end

// @lcpr case=start
// "1.01"\n"1.001"\n
// @lcpr case=end

// @lcpr case=start
// "1.0"\n"1.0.0.0"\n
// @lcpr case=end

 */

