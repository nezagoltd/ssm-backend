import services from '../services';
import { successCodes, failureCodes } from '../helpers/statusCodes.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/response.helper';
import { encryptPassword } from '../helpers/passwordEncDec.helper';
import { generateToken } from '../helpers/token.helper';
import { successMessages, errorMessages } from '../helpers/messages.helper';

const { UserServiceInstance } = services;
const { created } = successCodes;
const { badRequest } = failureCodes;
const { accountCreatedTemporary } = successMessages;
const { accountFailedToCreate } = errorMessages;

/**
 * @description it gets a request and then it extracts user parameters from that request
 * @param {object} req
 * @returns {object} userParams
 */
const getUserParams = req => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  const encryptedPassword = encryptPassword(password);

  return {
    firstName, lastName, email, password: encryptedPassword,
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
      sendSuccessResponse(
        res, created, accountCreatedTemporary, generateToken(savedUser), savedUser,
      );
    } else {
      sendErrorResponse(res, badRequest, accountFailedToCreate);
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