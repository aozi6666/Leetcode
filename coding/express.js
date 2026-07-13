import { request, response} from 'express';

// host：拿到的请求/响应

// context：请求 上下文
const context = host.switchToHttp();

// 从 context 中获取请求对象
const request = context.getRequest();
const response = context.getResponse();

// 读取Token
const token = request.headers.authorization?.split(' ')[1];

// 设置 Http 状态码，返回 Josn 给前端
response.status(status).json({
    // 自己组织返回的 响应格式
    success: true,
    code: status,
    message: message,
    data: data,
    timestamp: new Date().getTime(),
    path: request.url
});