import { Router } from 'express';
import controllers from '../../../app/controllers';
import middlewares from '../../../app/middlewares';

const loginRouter = Router();

const { SessionControllerInstance } = controllers;
const { checkCredentials } = middlewares;

loginRouter.post('/', checkCredentials, SessionControllerInstance.create);

export default loginRouter;
