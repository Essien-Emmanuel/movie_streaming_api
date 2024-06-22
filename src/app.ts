import express from 'express';
import bodyParser from 'body-parser';

import { GeneralMiddleware } from './middlewares/general';
import { router as routes } from './routes/index';

const { ErrorHandler, NotFoundHandler, DevLog } = GeneralMiddleware;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(DevLog);
app.use(routes);

app.use(NotFoundHandler);
app.use(ErrorHandler);

export { app };