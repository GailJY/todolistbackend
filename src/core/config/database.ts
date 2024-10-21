import { registerAs } from "@nestjs/config"
import * as process from 'node:process';

export default registerAs('database',() => {
    return {
        host: process.env.DB_HOST || '127.0.0.1',
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        dllEnable: process.env.DDL_ENABLE === 'true'
    }
})