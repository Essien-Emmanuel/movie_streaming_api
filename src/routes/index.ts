import express from 'express';
import { router as testRoutes }  from './test';

const router = express();

router.use(testRoutes);

export { router }