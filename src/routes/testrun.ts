import { RouteLoader } from './loader.main';
import { TestController } from '../controllers/test';

export const loadTestRouter = new RouteLoader(TestController).load()
