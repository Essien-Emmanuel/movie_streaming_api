import { RouteLoader } from './loader.main';
import { UserController } from '../controllers/user.controller';

export const loadUserRouter = new RouteLoader(UserController).load();
