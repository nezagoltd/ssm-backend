import { Router } from 'express';
import controllers from '../../../app/controllers';
import middlewares from '../../../app/middlewares';

const userRouter = Router();

const { UserControllerInstance } = controllers;
const {
  dataForVerifyEmail,
  respondAfterVerifyingEmail,
  dataForApprovingUser,
} = middlewares;

userRouter.post('/', UserControllerInstance.create);
userRouter.get('/verify-email', dataForVerifyEmail, UserControllerInstance.update, respondAfterVerifyingEmail);
userRouter.patch('/:userId', dataForApprovingUser, UserControllerInstance.update);

export default userRouter;
