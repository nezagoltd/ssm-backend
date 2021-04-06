import UserController from './user.controller';
import UserRoleController from './userrole.controller';

const UserControllerInstance = new UserController();
const UserRoleControllerInstance = new UserRoleController();

export default { UserControllerInstance, UserRoleControllerInstance };
