import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AppInterceptor<T = any> implements NestInterceptor<T, any> {

    // 内部实现 intercept 方法
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
        // 进入controller之前的拦截器逻辑
        console.log('Before controller logic');
        
        // 放行,让请求进入 controller 处理
        return next.handle().pipe(
            // 在请求处理完成后，进入拦截器逻辑
            map((data) => {
                console.log('After controller logic');

                // 处理返回数据
                return {
                    success: true,
                    code: 'SUCCESS',
                    message: 'Success',
                    data,
                    timestamp: new Date().toISOString(),
                };
            })
        );
    }

}