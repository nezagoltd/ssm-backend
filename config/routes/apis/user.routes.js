import { Router } from 'express';
import controllers from '../../../app/controllers';
import middlewares from '../../../app/middlewares';

const userRouter = Router();

const { UserControllerInstance, UserRoleControllerInstance } = controllers;
const {
  dataForVerifyEmail,
  respondAfterVerifyingEmail,
  dataForApprovingUser,
  unapprovedUserData,
} = middlewares;

userRouter.post('/', UserControllerInstance.create);
userRouter.get('/', UserControllerInstance.all);
userRouter.get('/verify-email', dataForVerifyEmail, UserControllerInstance.update, respondAfterVerifyingEmail);
userRouter.patch('/approve-user/:userId', dataForApprovingUser, UserControllerInstance.update, UserRoleControllerInstance.create);
userRouter.get('/not-approved-users', unapprovedUserData, UserControllerInstance.all);

export default userRouter;
