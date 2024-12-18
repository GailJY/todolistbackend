import { IsNotEmpty, MinLength} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TokenCreateRequest{

    @IsNotEmpty({
        message: "用户名不能为空"
    })
    @ApiProperty()
    username: string;

    @IsNotEmpty({
        message: "密码不能为空"
    })
    @MinLength(6,{
        message: "密码不少于6位"
    })
    @ApiProperty()
    password: string;
}