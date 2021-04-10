import { Router } from 'express';
import userRouter from './user.routes';
import sessionRouter from './login.routes';
import roleRouter from './role.routes';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/session', sessionRouter);
apiRouter.use('/roles', roleRouter);

export default apiRouter;
