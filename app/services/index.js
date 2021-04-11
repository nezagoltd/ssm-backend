import UserService from './user.service';
import UserRoleService from './userrole.service';
import RoleService from './role.service';
import InterestRateService from './interestrate.service';

const UserServiceInstance = new UserService();
const UserRoleServiceInstance = new UserRoleService();
const RoleServiceInstance = new RoleService();
const InterestRateServiceInstance = new InterestRateService();

export default {
  UserServiceInstance,
  UserRoleServiceInstance,
  RoleServiceInstance,
  InterestRateServiceInstance,
};
