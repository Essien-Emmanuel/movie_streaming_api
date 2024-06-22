import { DataSource  } from "typeorm";
import { Config } from '../config';

const { type, host, port, username, password, database, } = Config.database.localConfig;

export const myDataSource = new DataSource({
    type,
    host,
    port,
    username,
    password,
    database,
    entities: ["src/database/entity/*.ts"],
    logging: true,
    synchronize: true,
});