/*
 * @lc app=leetcode.cn id=3 lang=javascript
 * @lcpr version=30403
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} 
 * @return {number}
 */

// map基础知识
/* 
    map数据结构 （键-值 对 key-value）
    常见属性：map.size 获取 map 的大小,key 的个数
    常用方法：
        1. map.has(key) 判断是否存在键key
        2. map.get(key) 获取键key对应的值value
        3. map.set(key, value) 设置键key对应的值value
        4. map.delete(key) 删除键key对应的键值对
    
    场景：计数优先用 Map
*/
var lengthOfLongestSubstring = function(s) {
    // 解题思路： 滑动窗口 + map

    // 初始化
    // map（key, value）表示 字符为 key 的字符出现的次数为 value
    let window = new Map();
    // 滑动窗口，左右指针
    let left = 0;
    let right = 0;
    // 结果数字
    let res = 0;

    // 进入循环
    while(right < s.length){
        // 得到要进入窗口的 right 指针对应的元素
        let currentChar = s[right];  // key
        // 窗口right右移
        right++;
        // 进行窗口的更新: key 对应的 value  的计数更新
        window.set(currentChar, (window.get(currentChar) || 0) + 1);

        // 判断左窗口是否需要收缩(❗“把窗口修复到合法状态”)
        // ✅ while 可能会连续执行多次，一直缩到“合法”为止
        while(window.get(currentChar) > 1){
            // 取窗口左边界元素
            let deleteChar = s[left];
            // 窗口左指针右移
            left++;
            // 窗口的更新：key 对应的 value  的计数更新
            window.set(deleteChar, window.get(deleteChar) - 1);
        }

        // 更新结果
        res = Math.max(res, right - left);
    }
    return res;
};
// @lc code=end



/*
// @lcpr case=start
// "abcabcbb"\n
// @lcpr case=end

// @lcpr case=start
// "bbbbb"\n
// @lcpr case=end

// @lcpr case=start
// "pwwkew"\n
// @lcpr case=end

 */



console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));