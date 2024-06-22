import express from 'express';
import { loadTestRouter as testRunRoutes} from './testrun'

const router = express();

router.use(testRunRoutes);

export { router }