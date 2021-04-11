import { Router } from 'express';
import userRouter from './user.routes';
import sessionRouter from './login.routes';
import roleRouter from './role.routes';
import interestRateRouter from './interestrate.routes';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/session', sessionRouter);
apiRouter.use('/roles', roleRouter);
apiRouter.use('/interest-rates', interestRateRouter);

export default apiRouter;
