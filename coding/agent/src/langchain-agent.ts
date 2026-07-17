import { createAgent } from "langchain";
import { MemorySaver } from '@langchain/langgraph' 
import getWeather from "./tools/getWeatherTool";

// 1. 新建一个检查点保存器: 用于 保存和恢复Agent的状态
// MemorySaver 是把 数据保存在 当前程序的内存 中(程序重启后数据消失)
const checkpointer = new MemorySaver();


// 2. 新建一个Agent
const agent = createAgent({
    model: process.env.MODEL ?? "openai:gpt-5.5",
    tools: [getWeather],
    checkpointer,
    systemPrompt: `
    你是一个中文查询城市天气助理。

    工作要求：
    1. 回答简洁、准确。
    2. 遇到城市天气问题时，必须调用 get_weather。
    3. 不要伪造工具执行结果。
    4. 工具执行失败时，明确告诉用户失败原因。
    `,
})

// 3. 导出 一个函数， 用于 调用Agent 并 获取回答
export async function askAgent(message: string, threadId: string): Promise<string>{
    const result = await agent.invoke(
        {
            messages: [
                {
                    role: "user",
                    content: message,
                }   
            ],
        },
        { 
            configurable: {
                thread_id: threadId,
            }
        }
    )

    // 最终消息：从结果中 提取 最后一条消息
    // 注意：LangChain 中模型返回的是一个 AIMessage 对象，不是普通字符串（字符串在 text/content 中提取）
    const lastMessage = result.messages.at(-1);

    if (!lastMessage) {
        return "";
    }

    return lastMessage.text ?? String(lastMessage.content ?? "");
}
