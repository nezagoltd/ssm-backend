import UserController from './user.controller';
import UserRoleController from './userrole.controller';
import SessionController from './session.controller';

const UserControllerInstance = new UserController();
const UserRoleControllerInstance = new UserRoleController();
const SessionControllerInstance = new SessionController();

export default {
  UserControllerInstance,
  UserRoleControllerInstance,
  SessionControllerInstance,
};
