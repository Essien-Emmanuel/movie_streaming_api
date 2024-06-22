import dotenv from 'dotenv';

dotenv.config();

export const AppEnv = {
    DEV: 'development',
    TEST: "test",
    PROD: "production"
} as const;

interface IConfig {
    app: {
        port: number,
        env: string //(typeof AppEnv)[keyof typeof AppEnv ]
    }
}

export const Config: IConfig = {
    app: {
        port: +process.env.PORT!,
        env: process.env.APP_ENV?.trim()!

    }
}