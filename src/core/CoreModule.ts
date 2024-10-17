import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from "./service/UserService";
import { UserController } from "./controller/UserController";
import { User } from "./entity/User.entity";

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root123456',
            database: 'todolist',
            // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            entities: [User],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User])
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