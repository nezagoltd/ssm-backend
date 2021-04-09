import { Router } from 'express';
import controllers from '../../../app/controllers';
import middlewares from '../../../app/middlewares';

const sessionRouter = Router();

const { LoginControllerInstance } = controllers;
const { checkCredentials } = middlewares;

sessionRouter.post('/login', checkCredentials, LoginControllerInstance.create);
sessionRouter.delete('/logout', LoginControllerInstance.delete);

export default sessionRouter;
