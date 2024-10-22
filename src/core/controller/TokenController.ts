import { Controller, Body, Post } from '@nestjs/common';
import { TokenCreateRequest } from '../dto/TokenCreateRequest';
import { AuthService } from '../service/AuthService';

@Controller('token')
export class TokenController {

    constructor(
        private authService: AuthService
    ){}

    @Post()
    create(@Body() tokenCreateRequest: TokenCreateRequest){
        return this.authService.createToken(tokenCreateRequest);
    }
}