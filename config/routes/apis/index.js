import { Router } from 'express';
import sessionRouter from './login.routes';

const apiRouter = Router();

apiRouter.use('/users', sessionRouter);
apiRouter.use('/sessions', sessionRouter);

export default apiRouter;
