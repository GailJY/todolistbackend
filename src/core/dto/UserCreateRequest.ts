import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UserCreateRequest{
    @IsNotEmpty({
        message: "用户名不能为空"
    })
    @ApiProperty()
    username: string;

    @IsNotEmpty({
        message: "密码不能为空"
    })
    @MinLength(6,{
        message: "密码不能至少6个字符"
    })
    @ApiProperty()
    password: string;
}