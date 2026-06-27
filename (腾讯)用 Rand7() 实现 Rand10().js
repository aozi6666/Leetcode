/*
 * @lc app=leetcode.cn id=470 lang=javascript
 * @lcpr version=30403
 *
 * [470] 用 Rand7() 实现 Rand10()
 */

// @lc code=start
/**
 * The rand7() API is already defined for you.
 * var rand7 = function() {}
 * 
 *  第1个 rand7()：第一次投骰子决定你在哪一行（槽位）
    第2个 rand7()：第二次投骰子决定你在这一行的第几个位置

    槽位 0：  1   2   3   4   5   6   7
    槽位 1：  8   9  10  11  12  13  14
    槽位 2： 15  16  17  18  19  20  21
    槽位 3： 22  23  24  25  26  27  28
    槽位 4： 29  30  31  32  33  34  35
    槽位 5： 36  37  38  39  40  41  42
    槽位 6： 43  44  45  46  47  48  49

 * 公式 = 槽位 × 槽位长度 + 位置偏移
    int slot = rand7() - 1;   // 0 ~ 6
    int pos  = rand7();       // 1 ~ 7
    int num  = slot * 7 + pos;
        slot * 7：跳到对应槽位的开头
        + pos：在该槽位内精确到第几格
 * @return {number} a random integer in the range 1 to 7
 */
var rand10 = function() {
    // 解题思路： 先用两次 rand7() 等概率造出 1~49，
    // 再只取其中能被 10 均分的 1~40，
    // 把它映射成 1~10（多出来的 41~49 丢掉重来）

    while (true) {
        // 调用两次 rand7()
        // 1. 第一次扔骰子：选中一个“槽位”（行），范围 0 ~ 6 
        // 【第一次 rand7() - 1 得到 0 ~ 6】

        let row = (rand7() - 1);
        // 后续，再乘以 7，表示当前处于哪一组

        // 2. 第二次扔骰子：在槽位内选一个“拉链位置”（列），范围 1 ~ 7
        // 【第二次 rand7() 得到 1 ~ 7，表示组内位置】
        let col = rand7();

        // 3. 合成拉链编号：通过“槽位 * 每槽位数 + 列偏移”得到 1~49 均匀分布
        // 【最终 num 等概率落在 1 ~ 49】
        let num = row * 7 + col;

        // 4. 拒绝采样：只认前 40 个编号（因为 40 能被 10 整除）只使用 1 ~ 40
        // 因为 40 可以被 10 整除，可以均匀映射到 1 ~ 10
        if (num <= 40) {
            // 把 1 ~ 40 映射到 1 ~ 10 （ - 1 再 取余数 % ）
            // 1, 11, 21, 31  -> 1
            // 2, 12, 22, 32  -> 2
            // ...
            // 10, 20, 30, 40 -> 10
            return (num - 1) % 10 + 1;
        }

        // 如果 num 是 41 ~ 49，直接丢弃，重新随机采样重来
        // 这样可以保证最终结果仍然是均匀的
    }

};
// @lc code=end



/*
// @lcpr case=start
// 1\n
// @lcpr case=end

// @lcpr case=start
// 2\n
// @lcpr case=end

// @lcpr case=start
// 3\n
// @lcpr case=end

 */

