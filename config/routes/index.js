import { Router } from 'express';
import apiRouter from './apis';
import welcomeRoute from './welcome.route';
import docRouter from './docRouter.route';

const allRoutes = Router();

allRoutes.use('/', welcomeRoute);
allRoutes.use('/api', apiRouter);
allRoutes.use('/public', docRouter);

export default allRoutes;
