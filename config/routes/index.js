import { Router } from 'express';
import apiRouter from './apis';
import welcomeRoute from './welcome.route';

const allRoutes = Router();

allRoutes.use('/', welcomeRoute);
allRoutes.use('/api', apiRouter);

export default allRoutes;
