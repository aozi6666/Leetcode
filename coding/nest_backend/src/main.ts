/// <reference types="node" />
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 设置全局验证 Pipe管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 自动去除 DTO 中未定义的属性
    forbidNonWhitelisted: true, // 如果请求中包含未定义的属性，则抛出异常
    transform: true, // 自动将请求数据转换为 DTO 实例
  }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
