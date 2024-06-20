import { Router } from 'express';
import { TestController } from '../controllers/test';

const { testFn } = TestController;

const router = Router();

router.get('/test', testFn())

export { router } 