import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { appDataSource } from './config';
import { TEntityRepository } from './types';

class Database {
    private static instance: Database;
    constructor() {
        this.initializeConnection()
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Database()
        }
        return this.instance;
    }

    async initializeConnection() {
        try {
            const dbConnected = await appDataSource.initialize()
            if (dbConnected) console.log('- Connected to database successfully');
            else console.log('not connected to database')
            return dbConnected;  
        } catch (error: any) {
            console.log('- Error:: Unable to initialize database connection')
            return
        }
    }

    static async createRepository<T extends ObjectLiteral, R>(entity: EntityTarget<T>, EntityRepository: TEntityRepository<T, R>) {
        if (!appDataSource.isInitialized) {
            await appDataSource.initialize() 
        }
        const repository: Repository<T> =  appDataSource.getRepository(entity);
        return new EntityRepository(repository);
    }
}

export { Database }