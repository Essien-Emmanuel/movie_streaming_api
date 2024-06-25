import dotenv from 'dotenv';
import {DatabaseType, TAppEnv  } from './types';

dotenv.config();


interface IConfig {
    app: {
        port: number,
        env: TAppEnv
    },
    database: {
        localConfig: {
            type: DatabaseType,
            host: string,
            port: number,
            username: string,
            password: string,
            database: string
        }
    }
}

export const Config: IConfig = {
    app: {
        port: +process.env.PORT!,
        env: process.env.APP_ENV?.trim()! as TAppEnv
    },
    database: {
        localConfig: {
            type: process.env.DB_TYPE! as DatabaseType,
            host: process.env.LOCAL_DB_HOST!,
            port: +process.env.LOCAL_DB_PORT!,
            username: process.env.LOCAL_DB_USERNAME!,
            password: process.env.LOCAL_DB_PASSWORD!,
            database: process.env.LOCAL_DB_NAME!
        }
    }
}