import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { AppService } from "../services/AppService";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { AppInterceptor } from "../interceptors/app.interceptor";


@Controller('apps')
@UseGuards(JwtAuthGuard) // 使用 JWT 认证守卫
@UseInterceptors(AppInterceptor) // 使用自定义拦截器
export class AppController {
    // 得到 NestJS 的依赖注入容器中的 AppService 实例
    constructor(private readonly appService: AppService){}

    // GET 请求， 访问路径为 /apps/:id
    @Get(':id')
    @UseInterceptors(AppInterceptor)// 使用自定义拦截器
    // 路径 path 中有动态路由 @Param('id)
    getUserById(@Param('id') id: number){
        // 调用 AppService 的方法
        return this.appService.findUserById(id);
    }
}