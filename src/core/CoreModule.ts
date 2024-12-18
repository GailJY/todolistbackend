/*
 * @Author: yejiayu gailjy@126.com
 * @Date: 2024-10-23 09:06:30
 * @LastEditors: yejiayu gailjy@126.com
 * @LastEditTime: 2024-10-28 12:00:46
 * @FilePath: \todolist-backend\src\core\CoreModule.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from "./service/UserService";
import { UserController } from "./controller/UserController";
import { User } from "./entity/User";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmConfigService } from './service/TypeOrmConfigService';
import database from "./config/database";
import { Role } from "./entity/Role";
import { APP_GUARD, APP_PIPE, APP_FILTER } from "@nestjs/core";
import { ValidationPipe } from "./pipe/ValidationPipe";
import { JwtModule } from "@nestjs/jwt";
import { TokenController } from "./controller/TokenController";
import { AuthService } from "./service/AuthService";
import { SECRET_KEY } from "./constant/user";
import { AuthGuard } from "./guard/AuthGuard";
import { HttpExceptionFilter } from "./filter/HttpExceptionFilter";


@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
        }),
        TypeOrmModule.forFeature([User,Role]),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [database],
        }),

        JwtModule.register({
            global: true,
            secret: SECRET_KEY,
            signOptions: {expiresIn: '300s'}
        }),


    ],
    controllers: [
        UserController,
        TokenController,
    ],
    providers: [
        UserService,
        AuthService,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        }
    ],
    exports: [],
})

export class CoreModule{

}