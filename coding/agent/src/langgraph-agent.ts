import { initChatModel } from "langchain";
import getWeather from "./tools/getWeatherTool";
import calculator from "./tools/calculatorTool";
import getCurrentTime from "./tools/getCurrentTimeTool";
import { z } from "zod/v4";
import {
  StateGraph,
  StateSchema,
  MessagesValue,
  ReducedValue,
  GraphNode,
  MemorySaver,
  ConditionalEdgeRouter,
  START,
  END,
} from "@langchain/langgraph";

import { SystemMessage, AIMessage, ToolMessage, HumanMessage } from "@langchain/core/messages";

async function main(){
    // 1. 新建一个模型
    const model = await initChatModel(
        process.env.MODEL ?? "openai:gpt-5.5",
        {
            temperature: 0.7,
        }
    )

    // 2. 绑定工具
    // 按 工具Tool 建立映射
    const toolsByName = {
        calculator,
        getCurrentTime,
        getWeather,
    }
    const tools = Object.values(toolsByName);
    const modelWithTools = model.bindTools(tools);


    // 3. 设置 Agent State状态
    const AgentState = new StateSchema({
        messages: MessagesValue,
        llmCalls: new ReducedValue(
            z.number().default(0),
            { reducer: (acc, cur) => acc + cur }
        ),
    })

    // 4. 设置 model 节点
    const callModel: GraphNode<typeof AgentState>  = async (state: any) => {
        const response = await modelWithTools.invoke([
                ...state.messages,
                new SystemMessage(`
                    你是一个中文个人助理。

                    要求：
                    1. 数学计算必须调用 calculator。
                    2. 当前时间问题必须调用 get_current_time。
                    3. 不要伪造工具执行结果。
                    4. 回答保持简洁。
                `),
            ]
        );

        return {
            messages: [response],
            llmCalls: state.llmCalls + 1,
        }
    }

    // 5. 设置 工具Tools 节点
    const callTools: GraphNode<typeof AgentState>  = async (state: any) => {
        // 最新消息
        const lastMessage = state.messages.at(-1);

        // 检查是否是 AIMessage
        if (!lastMessage || !AIMessage.isInstance(lastMessage)) {
            return {
                messages: [],
                llmCalls: state.llmCalls,
            };
        }

        const toolResults: ToolMessage[] = [];

        // 遍历 tool_calls
            for(const toolCall of lastMessage.tool_calls ?? []) {
                const selectedTool = (toolsByName as Record<string, any>)[toolCall.name];

            // 检查工具是否存在
            if (!selectedTool) {
                throw new Error(`工具 ${toolCall.name} 不存在`);
            }

            // 调用工具
            const toolResult = await selectedTool.invoke(toolCall);
            toolResults.push(toolResult);
        }
        
        // 返回工具执行结果
        return {
            messages: toolResults,
            llmCalls: state.llmCalls,
        }
    }

    // 6. 设置 条件边
    const routerAfterModel: ConditionalEdgeRouter<typeof AgentState, Record<string, any>, "tools"> = (state: any) => {
        // 取最新消息
        const lastMessage = state.messages.at(-1);

        // 检查是否是 AIMessage
        if(!lastMessage || !AIMessage.isInstance(lastMessage)){
            return END;
        }

        // 检查是否有 tool_calls, 有则返回 tools 节点
        // 无则返回 END(结束)
        if(lastMessage.tool_calls?.length){
            return "tools";
        }

        return END;
    }

    // 7. 创建 并 编译 状态图
    const graph = new StateGraph(AgentState)
        .addNode("model", callModel)
        .addNode("tools", callTools)
        .addEdge(START, "model")
        .addConditionalEdges(
            "model",
            routerAfterModel,
            ["tools", END]
        )
        .addEdge("tools", "model")
        .compile({
            checkpointer: new MemorySaver(),
        });

    // 8. 调用 Graph, invoke(state)
    const config = {
        configurable: {
            thread_id: "graph-user-001",
        },
    }

    const resultState = await graph.invoke({
            messages: [
                new HumanMessage("计算 20 乘以 15，然后告诉我洛杉矶现在几点。"),
            ]
        },
        config,
    )

    // 9. 打印结果
    // 从最终状态中提取最新消息
    const lastMessage = resultState.messages.at(-1);

    // 打印
    alert(lastMessage?.text ?? lastMessage?.content);
}

void main();
