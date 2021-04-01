import UserService from './user.service';
import UserRoleService from './userrole.service';
import RoleService from './role.service';

const UserServiceInstace = new UserService();
const UserRoleServiceInstace = new UserRoleService();
const RoleServiceInstace = new RoleService();

export default { UserServiceInstace, UserRoleServiceInstace, RoleServiceInstace };
