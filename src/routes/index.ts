import express from 'express';
import { loadRouter } from './loader.main';
import { UserController } from '../controllers/user.controller';
import { TestController } from '../controllers/test';
import { UserAuthController } from '../controllers/auth/user.auth.controller';

const router = express();

router.use(loadRouter(UserAuthController));
router.use(loadRouter(UserController));
router.use(loadRouter(TestController));

export { router };
