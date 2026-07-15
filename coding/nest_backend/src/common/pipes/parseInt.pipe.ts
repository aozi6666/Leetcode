import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
    // 实现 transform 方法（入口）
    transform(value: string, metadata: ArgumentMetadata): number {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new Error('Validation failed');
        }
        
        // 返回转换后的值
        return val;
    }
}