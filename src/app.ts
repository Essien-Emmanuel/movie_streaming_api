import express from 'express';
import bodyParser from 'body-parser';

import { router as routes } from './routers/index';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);


export { app };