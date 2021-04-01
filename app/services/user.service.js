import DataCable from '../../config/initializers/data.cable';
import models from '../models';

const { User, UserRole } = models;
/**
 * @description this class user service contains all methods regarding creating user
 * updating user, reading user and deleting a user
 */
class UserService extends DataCable {
  /**
     * @description a constructor and a super methods to call parent class methods
     */
  constructor() {
    super();
    this.model = User;
    this.associateTable = [UserRole];
  }
}

export default new UserService();
