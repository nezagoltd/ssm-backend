import { Router } from 'express';
import userRouter from './user.routes';
import sessionRouter from './login.routes';
import roleRouter from './role.routes';
import interestRateRouter from './interestrate.routes';
import accountTypeRouter from './accounttype.routes';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/session', sessionRouter);
apiRouter.use('/roles', roleRouter);
apiRouter.use('/interest-rates', interestRateRouter);
apiRouter.use('/account-types', accountTypeRouter);

export default apiRouter;
