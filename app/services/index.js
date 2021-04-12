import UserService from './user.service';
import UserRoleService from './userrole.service';
import RoleService from './role.service';
import InterestRateService from './interestrate.service';
import AccountTypeService from './accounttype.service';
import MembertTypeService from './memberType.service';

const UserServiceInstance = new UserService();
const UserRoleServiceInstance = new UserRoleService();
const RoleServiceInstance = new RoleService();
const InterestRateServiceInstance = new InterestRateService();
const AccountTypeServiceInstance = new AccountTypeService();
const MembertTypeServiceInstance = new MembertTypeService();

export default {
  UserServiceInstance,
  UserRoleServiceInstance,
  RoleServiceInstance,
  InterestRateServiceInstance,
  AccountTypeServiceInstance,
  MembertTypeServiceInstance,
};
