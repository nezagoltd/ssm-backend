import { Router } from 'express';
import controllers from '../../../app/controllers';

const interestRateRouter = Router();

const { InterestRateControllerInstance } = controllers;

interestRateRouter.get('/', InterestRateControllerInstance.all);
interestRateRouter.post('/create', InterestRateControllerInstance.create);
interestRateRouter.get('/all/:interestRateId', InterestRateControllerInstance.show);
interestRateRouter.patch('/update/:interestRateId', InterestRateControllerInstance.update);
interestRateRouter.delete('/:interestRateId', InterestRateControllerInstance.delete);

export default interestRateRouter;
