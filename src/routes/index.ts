import express from 'express';
import { loadTestRouter as testRunRoutes} from './testrun';
import { loadUserRouter as UserRoutes} from './user';

const router = express();

router.use(testRunRoutes);
router.use(UserRoutes);

export { router }