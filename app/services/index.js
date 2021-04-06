import UserService from './user.service';
import UserRoleService from './userrole.service';
import RoleService from './role.service';

const UserServiceInstance = new UserService();
const UserRoleServiceInstance = new UserRoleService();
const RoleServiceInstance = new RoleService();

export default { UserServiceInstance, UserRoleServiceInstance, RoleServiceInstance };
