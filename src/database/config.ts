import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "@mySQL_300",
    database: "testdb",
    entities: ["src/database/entity/*.ts"],
    logging: true,
    synchronize: true,
});