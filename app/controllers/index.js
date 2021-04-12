import UserController from './user.controller';
import UserRoleController from './userrole.controller';
import LoginController from './login.controller';
import RoleController from './role.controller';
import InterestRateController from './interestrate.controller';
import AccountTypeController from './accounttype.controller';
import MemberTypeController from './membertype.controller';

const UserControllerInstance = new UserController();
const UserRoleControllerInstance = new UserRoleController();
const LoginControllerInstance = new LoginController();
const RoleControllerInstance = new RoleController();
const InterestRateControllerInstance = new InterestRateController();
const AccountTypeControllerInstance = new AccountTypeController();
const MemberTypeControllerInstance = new MemberTypeController();

export default {
  UserControllerInstance,
  UserRoleControllerInstance,
  LoginControllerInstance,
  RoleControllerInstance,
  InterestRateControllerInstance,
  AccountTypeControllerInstance,
  MemberTypeControllerInstance,
};
