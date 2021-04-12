import { Router } from 'express';
import controllers from '../../../app/controllers';

const memberTypeRouter = Router();

const { AccountTypeControllerInstance } = controllers;

memberTypeRouter.get('/', AccountTypeControllerInstance.all);
memberTypeRouter.post('/create', AccountTypeControllerInstance.create);
memberTypeRouter.get('/all/:accountTypeId', AccountTypeControllerInstance.show);
memberTypeRouter.patch('/update/:accountTypeId', AccountTypeControllerInstance.update);
memberTypeRouter.delete('/:accountTypeId', AccountTypeControllerInstance.delete);

export default memberTypeRouter;
