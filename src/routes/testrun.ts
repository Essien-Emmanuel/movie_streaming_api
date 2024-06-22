import { RouteLoader } from './loader.main';
import { TestController } from '../controllers/test';

const loadTestRouter = new RouteLoader(TestController).load()
export { loadTestRouter }
