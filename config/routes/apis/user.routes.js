import { Router } from 'express';
import controllers from '../../../app/controllers';

const userRouter = Router();

const { UserControllerInstance } = controllers;

userRouter.post('/', UserControllerInstance.create);

export default userRouter;
