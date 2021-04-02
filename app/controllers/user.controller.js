import services from '../services';

const { UserServiceInstance } = services;

/**
 * @description it gets a request and then it extracts user parameters from that request
 * @param {object} req
 * @returns {object} userParams
 */
const getUserParams = req => {
  const {
    firstName, lastName, email, password,
  } = req.body;

  return {
    firstName, lastName, email, password,
  };
};

/**
 * @class
 */
class UserController {
  /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description GET: /users
  //  */
  // all = (req, res) => {}

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description POST: /users
   */
  create = async (req, res) => {
    const dataToSave = getUserParams(req);
    const savedUser = await UserServiceInstance.saveAll(dataToSave);
    if (savedUser) {
      // process a success response
    } else {
      // process a failure response
    }
  }

  /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description GET: /users/userId
  //  */
  // show = (req, res) => {}

  /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description PATCH: /users/userId
  //  */
  // update = (req, res) => {}

  // /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description DELETE: /users/userId
  //  */
  // delete = (req, res) => {}
}

export default UserController;