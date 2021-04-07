import { Router } from 'express';
import userRouter from './user.routes';
import sessionRouter from './login.routes';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/login', sessionRouter);

export default apiRouter;
