import { RouteLoader } from './loader';
import { TestController } from '../controllers/test';

const loadTestRouter = new RouteLoader(TestController).load()
// const router = loadRoute.load();
export { loadTestRouter }
