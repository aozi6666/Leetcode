// 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。
// 字母异位词: 字母异位词是通过重新排列不同单词或短语的字母而形成的单词或短语，并使用所有原字母一次。
// 不考虑答案输出的顺序。

// 示例 1:

// 输入: s = "cbaebabacd", p = "abc"
// 输出: [0,6]
// 解释:
// 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
// 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。

//  示例 2:

// 输入: s = "abab", p = "ab"
// 输出: [0,1,2]
// 解释:
// 起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
// 起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
// 起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。

/**
 * 438. 找到字符串中所有字母异位词
 * O(n)，并且每次滑动判断是 O(1)（看 diff 是否为 0）
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, t) {
  //题目本质：在字符串 s 里找所有“和 p 字符组成一样”的子串（顺序可以不同）
  //解题思路：滑动指针 + 两个map

  // 🎯 need：记录 t 中每个字符需要的次数（标准答案）
  let need = new Map();

  // 🪟 window：当前窗口中字符的次数
  let window = new Map();

  // 🔢 统计 t 的字符频率（让窗口的“字符频率表” == need）
  for (let c of t) {
      need.set(c, (need.get(c) || 0) + 1);
  }

  let left = 0, right = 0;

  // ✅ valid：有多少种类别的字符已经“满足要求”（表示某种字符类别“达标了”）
  // 某种自符类别达标：比如a:2, 则 a:1 不达标，valid不会++
  let valid = 0;

  // 🎯 结果数组
  let res = [];

  while (right < s.length) {

      // 👉 右边加入字符
      let c = s[right];
      right++;

      // 👉 只处理 need 里的字符
      if (need.has(c)) {

          // window 中该字符 +1
          window.set(c, (window.get(c) || 0) + 1);

          // 如果这个字符刚好达到 need 要求 → valid++
          if (window.get(c) === need.get(c)) {
              valid++;
          }
      }

      // 👉 当窗口长度 >= t长度，就要开始缩
      while (right - left >= t.length) {

          // 🎯 如果所有字符都匹配 → 找到一个异位词
          if (valid === need.size) {
              res.push(left);
          }

          // 👉 左边移出字符
          let d = s[left];
          left++;

          if (need.has(d)) {

              // ❗如果移出前是满足的 → 移出后就不满足了
              if (window.get(d) === need.get(d)) {
                  valid--;
              }

              // window 中该字符 -1
              window.set(d, window.get(d) - 1);
          }
      }
  }

  return res;
}
console.log(findAnagrams("cbaebabacd", "abc"));
console.log(findAnagrams("abab", "ab"));
