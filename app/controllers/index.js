import UserController from './user.controller';
import UserRoleController from './userrole.controller';
import LoginController from './login.controller';

const UserControllerInstance = new UserController();
const UserRoleControllerInstance = new UserRoleController();
const LoginControllerInstance = new LoginController();

export default {
  UserControllerInstance,
  UserRoleControllerInstance,
  LoginControllerInstance,
};
