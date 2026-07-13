import { Injectable } from "@nestjs/common";
import { CanActivate } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
// CanActivate 是 NestJS 规定的“守卫接口”: 需要继承
export class JwtAuthGuard implements CanActivate{
    // 从 NestJS 的依赖注入容器中获取 JwtService 实例
    constructor(private readonly JwtService: JwtService){}

    async canActivate(context: any): Promise<boolean> {
        const ctx = context.switchToHttp();
        // 拿到 requset 请求对象
        const request = ctx.getRequest();
        // 从请求头中获取 token
        const token = request.headers['authorization'];

        // 没有Token, 拒绝请求,抛出错误
        if(!token){
            throw new Error('No token provided');
        }

        // 进行 Jwt 校验    
        try {
            // 通过 NestJS 官方 JWT 模块提供的服务（得到 token 里面存的 payload 对象）
            const payload = await this.JwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });

            request.user = payload; // 将 payload 存入 request 对象中，方便后续使用
        } catch (error) {
            throw new Error('Invalid token');
        }
        // 通过校验，放行请求
        return true;
    }
}