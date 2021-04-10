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
  setDataForUpdatingUser,
  sendResponseAfterUserUpdate,
} = middlewares;

userRouter.post('/create', UserControllerInstance.create);
userRouter.get('/', UserControllerInstance.all);
userRouter.patch('/update/:userId', setDataForUpdatingUser, UserControllerInstance.update, sendResponseAfterUserUpdate);
userRouter.get('/all/:userId', UserControllerInstance.show);
userRouter.delete('/:userId', UserControllerInstance.delete);
userRouter.get('/verify-email', dataForVerifyEmail, UserControllerInstance.update, respondAfterVerifyingEmail);
userRouter.patch('/approve-user/:userId', dataForApprovingUser, UserControllerInstance.update, UserRoleControllerInstance.create);
userRouter.get('/not-approved-users', unapprovedUserData, UserControllerInstance.all);

export default userRouter;
