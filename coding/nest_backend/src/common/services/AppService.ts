import { Injectable } from "@nestjs/common";
import { UserResponseDto, CreateUserDto } from "../dto/user.dto";

@Injectable()
export class AppService {
    // 变量（模拟数据库）
    private users: UserResponseDto[] = [
        { id: 1, name: 'User 1', age: 25, email: 'zhangsan@example.com'},
        { id: 2, name: 'User 2', age: 30, email: 'lisi@example.com'},
    ];

    // 方法
    findUserById(id: number): UserResponseDto {
        const user = this.users.find(u => u.id === id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    createUser(createUserDto: CreateUserDto): UserResponseDto{
        const user: UserResponseDto = {
            id: this.users.length + 1,
            ...createUserDto,
        };
        this.users.push(user);
        return user;
    }
}