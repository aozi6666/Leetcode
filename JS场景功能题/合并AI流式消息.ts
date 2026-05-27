/**
 * 合并 AI 流式消息片段
 *
 * 题目背景：
 * 你正在开发一个 AI 对话产品。后端通过 WebSocket 不断返回消息片段，
 * 每个片段包含 messageId、seq 和 content。
 *
 */

/**
 * 要求：
 * 1. 按 messageId 分组
 * 2. 每组内部按 seq 从小到大排序
 * 3. 拼接 content
 * 4. 返回每条消息最终文本
 *
 * 期望返回：
 * const result = {
 *     a: "Hello!",
 *     b: "React is good",
 * };
 */

// Chunk 类型
type Chunk = {
    messageId: string;
    seq: number;
    content: string;
};
  
const chunks: Chunk[] = [
    { messageId: "a", seq: 2, content: "llo" },
    { messageId: "a", seq: 1, content: "He" },
    { messageId: "b", seq: 1, content: "React" },
    { messageId: "a", seq: 3, content: "!" },
    { messageId: "b", seq: 2, content: " is good" },
];

function mergeChunks(chunks: Chunk[]): Record<string, string> {
   // 解题思路：map + 遍历

   // key: messageId, value: 某个 messageId 下的 chunk数组
   const map = new Map<string, Chunk[]>();
   // 结果对象
   const res = Object.create(null);

   // 1. 遍历 chunks，按 messageId 分组
   chunks.forEach((item) => {
        // map 中没有 messageId
        if(!map.has(item.messageId)){
            // 创建一个空数组
            map.set(item.messageId, []);
        }
        // 2. 每个 messageId 对应的 chunk 数组中添加 item
        map.get(item.messageId)!.push(item);
   })

   // 2. 遍历 map，对每组按 seq 排序，然后拼接 content
   map.forEach((list, messageId) => {
        // 1. 先按照 seq 从小到大排序
        list.sort((a, b) => {
            return a.seq - b.seq;
        });

        // 2. 准备一个数组，用来存 content
        const contentList: string[] = [];

        // 3. 遍历排序后的 list，把 content 放进去
        list.forEach((item) => {
            contentList.push(item.content);
        })

        // 4. 把 content 数组拼成字符串
        const curContent = contentList.join('');

        // 5. 存入结果对象
        res[messageId] = curContent;
   })

   return res;
}