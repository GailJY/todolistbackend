import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from "./service/UserService";
import { UserController } from "./controller/UserController";
import { User } from "./entity/User.entity";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmConfigService } from './service/TypeOrmConfigService';
import database from "./config/database";
import { Role } from "./entity/Role";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./pipe/ValidationPipe";


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
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,{
            provide: APP_PIPE,
            useClass: ValidationPipe,
        }
    ],
    exports: [],
})

export class CoreModule{

}