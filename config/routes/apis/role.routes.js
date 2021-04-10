import { Router } from 'express';
import controllers from '../../../app/controllers';

const roleRouter = Router();
const { RoleControllerInstance } = controllers;

roleRouter.post('/create', RoleControllerInstance.create);
roleRouter.get('/', RoleControllerInstance.all);
roleRouter.get('/all/:roleId', RoleControllerInstance.show);
roleRouter.patch('/update/:roleId', RoleControllerInstance.update);

export default roleRouter;
