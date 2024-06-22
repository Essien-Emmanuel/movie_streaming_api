import express from 'express';
import bodyParser from 'body-parser';

import { router as routes } from './routes/index';
import { loadTestRouter as testRouter } from './routes/testrun';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);
app.use(testRouter)

export { app };