import { Router } from 'express';
import controllers from '../../../app/controllers';
import middlewares from '../../../app/middlewares';

const loginRouter = Router();

const { LoginControllerInstance } = controllers;
const { checkCredentials } = middlewares;

loginRouter.post('/', checkCredentials, LoginControllerInstance.create);

export default loginRouter;
