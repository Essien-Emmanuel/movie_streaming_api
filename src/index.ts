import { app } from './app';
import { Database } from './database/connection';

Database.getInstance();


app.listen(3000, () => {
    console.log('- App Environment:: 3000')
});
