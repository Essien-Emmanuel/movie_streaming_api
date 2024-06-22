export const AppEnv = {
    DEV: 'development',
    TEST: "test",
    PROD: "production"
} as const;

export type TAppEnv = (typeof AppEnv)[keyof typeof AppEnv ]

export type DatabaseType = "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql" | "oracle" | "mongodb";
