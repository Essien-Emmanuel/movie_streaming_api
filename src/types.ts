import { Request } from 'express';
import { User } from './database/entities/user.entity';
import { DeepPartial } from 'typeorm';


export const AppEnv = {
    DEV: 'development',
    TEST: "test",
    PROD: "production"
} as const;

export type TAppEnv = (typeof AppEnv)[keyof typeof AppEnv ]

export type DatabaseType = "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql" | "oracle" | "mongodb";

export const TokenFlag = {
    AUTH: 'authentication',
    EMAIL_VERIFICATION: 'email-verification'
} as const;

export type TTokenFlag = (typeof TokenFlag)[keyof typeof TokenFlag]

export interface SessionRequest extends Request {
    session: {
        token: string;
        user: DeepPartial<User>;
        role: TRole;
        [key: string]: any;
    }
}

export const Role = {
    SUPER_ADMIN: 'super-admin',
    ADMIN: 'admin',
    USER: 'user'
} as const;

export type TRole = (typeof Role)[keyof typeof Role];
