import DataCable from '../../config/initializers/data.cable';
import models from '../models';

const { User, InterestRate } = models;
/**
 * @description this class user service contains all methods regarding creating user
 * updating user, reading user and deleting a user
 */
class InterestRateService extends DataCable {
  /**
     * @description a constructor and a super methods to call parent class methods
     */
  constructor() {
    super();
    this.model = InterestRate;
    this.associateTable = [User];
  }
}

export default InterestRateService;
