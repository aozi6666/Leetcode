// #Leetcode165 版本号比较
/*
 * @lc app=leetcode.cn id=165 lang=javascript
 * @lcpr version=30403
 *
 * [165] 比较版本号
 */

// @lc code=start
/**
 * 使用字符串 .split()方法  + parseInt 数字转换为整数
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    // 将版本号按 '.' 分割为数组
    // .split() 方法 返回一个新数组，包含分割后的子字符串
    // "1.02.10".split('.') => ["1", "02", "10"]
    const v1 = version1.split('.');
    const v2 = version2.split('.');

    // 获取最大循环长度（比较的是数组的长度）
    const maxLength = Math.max(v1.length, v2.length);
    
    // 循环比较：
    for(let i = 0; i < maxLength; i++){
        // 取出 每 字符串的数字进行比较
        // 如果某个版本号缺失对应的修订号，视为 0 补全
        // parseInt(str, 10) 方法 将字符串转换为整数, 第二个参数表示进制（10 进制）
        const num1 = i < v1.length ? parseInt(v1[i], 10) : 0;
        const num2 = i < v2.length ? parseInt(v2[i], 10) : 0;

        // 比较结果
        if(num1 > num2) return 1;
        else if(num1 < num2) return -1;

        // 相同时，继续比较 下一组 . 之后的字符串
        else if(num1 === num2) continue;
    }
    // 如果所有版本号都相同，返回 0
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

