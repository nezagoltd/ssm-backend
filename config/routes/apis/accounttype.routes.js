import { Router } from 'express';
import controllers from '../../../app/controllers';

const accountTypeRouter = Router();

const { AccountTypeControllerInstance } = controllers;

accountTypeRouter.get('/', AccountTypeControllerInstance.all);
accountTypeRouter.post('/create', AccountTypeControllerInstance.create);
accountTypeRouter.get('/all/:accountTypeId', AccountTypeControllerInstance.show);
accountTypeRouter.patch('/update/:accountTypeId', AccountTypeControllerInstance.update);
accountTypeRouter.delete('/:accountTypeId', AccountTypeControllerInstance.delete);

export default accountTypeRouter;
