import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    // 方法
    findUserById(id: number) {
        return {
            id,
            name: `User ${id}`,
        }
    }
}