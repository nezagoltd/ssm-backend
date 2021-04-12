import { Router } from 'express';
import controllers from '../../../app/controllers';

const memberTypeRouter = Router();

const { MemberTypeControllerInstance } = controllers;

memberTypeRouter.get('/', MemberTypeControllerInstance.all);
memberTypeRouter.post('/create', MemberTypeControllerInstance.create);
memberTypeRouter.get('/all/:memberTypeId', MemberTypeControllerInstance.show);
memberTypeRouter.patch('/update/:memberTypeId', MemberTypeControllerInstance.update);
memberTypeRouter.delete('/:memberTypeId', MemberTypeControllerInstance.delete);

export default memberTypeRouter;
