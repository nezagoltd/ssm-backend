import dotenv from 'dotenv';
import services from '../services';

dotenv.config();

const { UserServiceInstance } = services;

/**
 * @class
 */
class UserController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description POST: /login
   */
  create = async (req, res) => {
    const { email, password } = req.body;
  }

  // /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description DELETE: /users/userId
  //  */
  // delete = (req, res) => {}
}

export default UserController;
