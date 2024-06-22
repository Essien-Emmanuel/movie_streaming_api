import { myDataSource } from './config';

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
            const dbConnected = await myDataSource.initialize()
            if (dbConnected) console.log('- Connected to database successfully');
            return dbConnected;  
        } catch (error: any) {
            console.log('- Error:: Unable to initialize database connection')
            return
        }
    }
}

export { Database }