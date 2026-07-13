import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "../controllers/AppController";
import { AppService } from "../services/AppService";
import { AppInterceptor } from "../interceptors/app.interceptor";

@Module({
    controllers: [AppController],
    // 注册 Provider：NestJS 就自动`注入
    providers: [AppService, {
        // 全局的 Interceptor 拦截器
        provide: APP_INTERCEPTOR,
        useClass: AppInterceptor,
    }],
}) 

export class AppModule {}