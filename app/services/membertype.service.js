import DataCable from '../../config/initializers/data.cable';
import models from '../models';

const { User, MemberType } = models;
/**
 * @description this class user service contains all methods regarding creating user
 * updating user, reading user and deleting a user
 */
class MembertTypeService extends DataCable {
  /**
     * @description a constructor and a super methods to call parent class methods
     */
  constructor() {
    super();
    this.model = MemberType;
    this.associateTable = [User];
  }
}

export default MembertTypeService;
