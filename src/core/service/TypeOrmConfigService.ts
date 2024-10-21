import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable , Inject} from '@nestjs/common';
import { ConfigType} from '@nestjs/config';
import database from '../config/database';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(
        @Inject(database.KEY)
        private dbConfig : ConfigType<typeof database>
    ){}

    createTypeOrmOptions(): TypeOrmModuleOptions{

        console.log(this.dbConfig)
        return{
            type: 'mysql',
            host: this.dbConfig.host,
            port: this.dbConfig.port,
            username: this.dbConfig.username,
            password: this.dbConfig.password,
            database: this.dbConfig.database,
            autoLoadEntities: true,
            synchronize: true,
        }
    }
}