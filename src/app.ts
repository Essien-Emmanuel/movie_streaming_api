import express from 'express';
import bodyParser from 'body-parser';

import { GeneralMiddleware } from './middlewares/general';
import { router as apiRoutes } from './routes';

const { ErrorHandler, NotFoundHandler, CORS, DevLog } = GeneralMiddleware;
const app = express();
const basePath = '/api/v1';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(CORS)
app.use(DevLog);
app.use(basePath, apiRoutes);

app.use(NotFoundHandler);
app.use(ErrorHandler);

export { app };