import { DataSource  } from "typeorm";
import { Config } from '../config';

const { type, host, port, username, password, database, } = Config.database.localConfig;

export const appDataSource = new DataSource({
    type,
    host,
    port,
    username,
    password,
    database,
    entities: ["src/database/entities/*.ts"],
    logging: ["schema", "error", "warn", "info", "log"],
    synchronize: true,
});     