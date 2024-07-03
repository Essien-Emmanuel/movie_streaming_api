import dotenv from 'dotenv';
import {DatabaseType, TAppEnv  } from './types';

dotenv.config();


interface IConfig {
    app: {
        port: number;
        env: TAppEnv;
        saltRounds: number;
        secret: string;
    },
    database: {
        localConfig: {
            type: DatabaseType;
            host: string;
            port: number;
            username: string;
            password: string;
            database: string;
        }
    },
    mail: {
        key: string;
        secret: string; 
    }
}

export const Config: IConfig = {
    app: {
        port: +process.env.PORT!,
        env: process.env.APP_ENV?.trim()! as TAppEnv,
        saltRounds: +process.env.SALT_ROUNDS!,
        secret: process.env.API_SECRET!
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
    },
    mail: {
        key: process.env.MAILJET_KEY!,
        secret: process.env.MAILJET_SECRET!
    }
}