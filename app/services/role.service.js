import DataCable from '../../config/initializers/data.cable';
import models from '../models';

const { UserRole, Role } = models;
/**
 * @description this class role service contains all methods regarding creating role
 * updating role, reading role and deleting a role
 */
class RoleService extends DataCable {
  /**
     * @description a constructor and a super methods to call parent class methods
     */
  constructor() {
    super();
    this.model = Role;
    this.associateTable = [UserRole];
  }
}

export default RoleService;
