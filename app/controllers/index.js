import UserController from './user.controller';
import UserRoleController from './userrole.controller';
import LoginController from './login.controller';
import RoleController from './role.controller';

const UserControllerInstance = new UserController();
const UserRoleControllerInstance = new UserRoleController();
const LoginControllerInstance = new LoginController();
const RoleControllerInstance = new RoleController();

export default {
  UserControllerInstance,
  UserRoleControllerInstance,
  LoginControllerInstance,
  RoleControllerInstance,
};
