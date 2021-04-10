import { Router } from 'express';
import controllers from '../../../app/controllers';

const roleRouter = Router();
const { RoleControllerInstance } = controllers;

roleRouter.post('/create', RoleControllerInstance.create);
roleRouter.get('/all', RoleControllerInstance.all);

export default roleRouter;
