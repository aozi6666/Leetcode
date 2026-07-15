import { IsNumber, IsString, Max, Min, IsEmail } from "class-validator";

// 用户请求 DTO
export class CreateUserDto {
    @IsString({ message: 'Name must be a string' })
    name: string | undefined;

    @IsNumber({}, { message: 'Age must be a number' })
    @Min(0, { message: 'Age must be a non-negative number' })
    @Max(150, { message: 'Age must be less than or equal to 150' })
    age: number | undefined;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    email!: string;
}


// 用户响应 DTO
export class UserResponseDto {
    id: number | undefined;
    name: string | undefined;
    age: number | undefined;
    email!: string;
}