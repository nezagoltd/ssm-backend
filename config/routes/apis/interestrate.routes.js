import { Router } from 'express';
import controllers from '../../../app/controllers';

const interestRateRouter = Router();

const { InterestRateControllerInstance } = controllers;

interestRateRouter.get('/', InterestRateControllerInstance.all);
interestRateRouter.post('/', InterestRateControllerInstance.create);

export default interestRateRouter;
