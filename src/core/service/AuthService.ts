import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common'
import { TokenCreateRequest } from '../dto/TokenCreateRequest';
import { UserService } from '../service/UserService';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, 
        private jwtService: JwtService
    ){}
    async createToken(tokenCreateRequest: TokenCreateRequest): Promise<string>{

        //查看当前是否存在数据库
        const user = await this.userService.findByUsername(
            tokenCreateRequest.username
        )

        if (!user) {
            throw new NotFoundException('用户不存在');
        }
        //对比密码，是否有效
        const isMatch = await bcrypt.compare(
            tokenCreateRequest.password,
            user.encryptedpassword
        )
        if(!isMatch){
            throw new UnauthorizedException('密码错误');
        }
        //生成token

        const payload = {
            sub: user.id,
            username: user.username,
        };
     
        return this.jwtService.signAsync(payload);
    }
}