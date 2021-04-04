import dotenv from 'dotenv';
import services from '../services';
import { successCodes, failureCodes } from '../helpers/statusCodes.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/response.helper';
import { successMessages, errorMessages } from '../helpers/messages.helper';

dotenv.config();

const { UserRoleServiceInstance } = services;
const { created } = successCodes;
const { internalServerError } = failureCodes;
const { roleAssignedSuccess } = successMessages;
const { roleAssignmentFail } = errorMessages;

/**
 * @class
 */
class UserRoleController {
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
    const { passedUserId, passedRoleId } = req.body;
    const { dataValues: savedUser } = await UserRoleServiceInstance.saveAll(
      { passedUserId, passedRoleId },
    );
    if (savedUser) {
      sendSuccessResponse(
        res, created, roleAssignedSuccess, null, null,
      );
    } else {
      sendErrorResponse(res, internalServerError, roleAssignmentFail);
    }
  }

  /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description GET: /users/userId
  //  */
  // show = (req, res) => {}

  // /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @param {object} next
  //  * @returns {void}
  //  * @description PATCH | GET: /users/userId
  //  */
  // update = async (req, res, next) => {
  //   const { dataToUpdate, whereCondition } = req;
  //   const userUpdateInfo = await UserServiceInstance.updateBy(dataToUpdate, whereCondition);
  //   if (userUpdateInfo) {
  //     res.statusCode = ok;
  //     next();
  //   } else {
  //     res.statusCode = internalServerError;
  //     next();
  //   }
  // }

  // /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description DELETE: /users/userId
  //  */
  // delete = (req, res) => {}
}

export default UserRoleController;
