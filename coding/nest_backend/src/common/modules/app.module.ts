import { Module } from "@nestjs/common";
import { AppController } from "../controllers/AppController";
import { AppService } from "../services/AppService";
import { JwtService } from "@nestjs/jwt";

@Module({
    controllers: [AppController],
    // 注册 Provider：NestJS 就自动注入
    providers: [AppService, JwtService],
}) 

export class AppModule {}