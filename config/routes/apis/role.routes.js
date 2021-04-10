import { Router } from 'express';
import controllers from '../../../app/controllers';

const roleRouter = Router();
const { RoleControllerInstance } = controllers;

roleRouter.post('/create', RoleControllerInstance.create);

export default roleRouter;
