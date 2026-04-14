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
var compareVersion = function(version1, version2) {
    
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

