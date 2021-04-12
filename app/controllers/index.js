import UserController from './user.controller';
import UserRoleController from './userrole.controller';
import LoginController from './login.controller';
import RoleController from './role.controller';
import InterestRateController from './interestrate.controller';
import AccountTypeController from './accounttype.controller';

const UserControllerInstance = new UserController();
const UserRoleControllerInstance = new UserRoleController();
const LoginControllerInstance = new LoginController();
const RoleControllerInstance = new RoleController();
const InterestRateControllerInstance = new InterestRateController();
const AccountTypeControllerInstance = new AccountTypeController();

export default {
  UserControllerInstance,
  UserRoleControllerInstance,
  LoginControllerInstance,
  RoleControllerInstance,
  InterestRateControllerInstance,
  AccountTypeControllerInstance,
};
