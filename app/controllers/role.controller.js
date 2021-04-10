import services from '../services';
import { successCodes, failureCodes } from '../helpers/statusCodes.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/response.helper';
import { successMessages, errorMessages } from '../helpers/messages.helper';

const { RoleServiceInstance } = services;
const { created, ok } = successCodes;
const { internalServerError, notFound } = failureCodes;
const { roleCreateSuccess, recordFound } = successMessages;
const { noRecordFound, deleteRecordFail, roleCreateFail } = errorMessages;

/**
 * @class
 */
class RoleController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /roles
   */
  all = async (req, res) => {
    const gottenRoles = await RoleServiceInstance.getAll();
    if (gottenRoles.count > 0) {
      sendSuccessResponse(res, ok, recordFound, null, gottenRoles);
    } else {
      sendErrorResponse(res, notFound, noRecordFound);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description POST: /roles/create
   */
  create = async (req, res) => {
    const createdRole = await RoleServiceInstance.saveAll(req.body);
    if (createdRole) {
      sendSuccessResponse(res, created, roleCreateSuccess, null, createdRole);
    } else {
      sendErrorResponse(res, internalServerError, roleCreateFail);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /roles/all/:roleId
   */
  show = async (req, res) => {
    let foundRole = await RoleServiceInstance.getBy({ id: req.params.roleId });
    if (foundRole) {
      foundRole = foundRole.dataValues;
      sendSuccessResponse(res, ok, recordFound, null, foundRole);
    } else {
      sendErrorResponse(res, notFound, noRecordFound);
    }
  }

  // /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @param {object} next
  //  * @returns {void}
  //  * @description PATCH | GET: /users/userId
  //  */
  // update = async (req, res, next) => {

  // }

  // /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description DELETE: /users/:userId
  //  */
  // delete = async (req, res) => {

  // }
}

export default RoleController;
