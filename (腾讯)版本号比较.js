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

/**
 * 方法2: 不使用字符串的 .split()方法, 使用 双指针 + ASCII 码 字符串转整数，比较
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */

var compareVersion2 = function(version1, version2) {
    const m = version1.length;
    const n = version2.length;
    let i = 0;
    let j = 0;

    // 进入循环
    while(i < m || j < n){
        // 每次遇到 . 时，需要初始化 num1 和 num2
        let num1 = 0;
        let num2 = 0;

        // 循环遇到 . 前，取出 num1
        while(i < m && version1[i] !== '.'){
            num1 = num1 * 10 + (version1.charCodeAt(i) - 48);
            i++;
        }

        // 循环遇到 . 前，取出 num2
        while(j < n && version2[j] !== '.'){
            num2 = num2 * 10 + (version2.charCodeAt(j) - 48);
            j++;
        }

        // 比较结果
        if(num1 > num2) return 1;
        else if(num1 < num2) return -1;
        // 相同时，继续比较 下一组 . 之后的字符串
        else if(num1 === num2){
            i++;
            j++;
        }
    }
    // 如果所有版本号都相同，返回 0
    return 0;
}
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

