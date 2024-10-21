import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from "./service/UserService";
import { UserController } from "./controller/UserController";
import { User } from "./entity/User.entity";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmConfigService } from './service/TypeOrmConfigService';
import database from "./config/database";


@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
        }),
        TypeOrmModule.forFeature([User]),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [database],
        }),
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
    ],
    exports: [],
})

export class CoreModule{

}