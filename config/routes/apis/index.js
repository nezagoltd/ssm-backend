import { Router } from 'express';
import userRouter from './user.routes';
import sessionRouter from './login.routes';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/session', sessionRouter);

export default apiRouter;
