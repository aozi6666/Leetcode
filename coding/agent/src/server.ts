// 创建 HTTP API
import express from "express";
import { askAgent } from "./langchain-agent";
import { z } from "zod";


// 1. 创建一个 服务器应用对象（过 app 注册接口）
const app = express();

// 2. 让 Express 能够 解析请求中的 JSON 数据
app.use(express.json());


// 3. 注册一个 POST 接口，路径为 POST /chat，
// 客户端请求：POST http://localhost:3000/chat 时，会调用 async 处理函数
app.post("/chat", async (req, res) => {

    // 定义 请求体Body 正确传入的 格式
    const chatBodySchema = z.object({
        message: z.string().trim().min(1),
        threadId: z.string().trim().min(1).default("default-thread"),
    })

    // 先拿到 请求体Body 中的 JSON 数据
    const parsedData = chatBodySchema.safeParse(req.body);

    // 检查 是否成功解析
    if(!parsedData.success){
        res.status(400).json({
            success: false,
            error: parsedData.error.flatten(),
        })
        return;
    }

    try {
        const answer = await askAgent(parsedData.data.message, parsedData.data.threadId);

        // 响应返回格式
        res.json({
            success: true,
            answer,
            threadId: parsedData.data.threadId,
        }) 
    } catch (error: unknown){
        console.error(error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : String(error),
        });
    }

});

const port = Number(process.env.PORT ?? 3000);

// 4. 启动服务器，并监听指定端口 http://localhost:3000
// 启动成功后, 执行回调
app.listen(port, () => {
    console.log(`Agent Server is running on port ${port}, please visit http://localhost:${port}`);
})