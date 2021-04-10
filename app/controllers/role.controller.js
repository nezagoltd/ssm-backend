import services from '../services';
import { successCodes, failureCodes } from '../helpers/statusCodes.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/response.helper';
import { successMessages, errorMessages } from '../helpers/messages.helper';

dotenv.config();

const { RoleServiceInstance } = services;
const { created, ok } = successCodes;
const { internalServerError, notFound } = failureCodes;
const {  } = successMessages;
const { noRecordFound, deleteRecordFail } = errorMessages;

/**
 * @class
 */
class RoleController {
  // /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description GET: /users
  //  */
  // all = async (req, res) => {

  // }

  // /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description POST: /users
  //  */
  // create = async (req, res) => {

  // }

  // /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description GET: /users/:userId
  //  */
  // show = async (req, res) => {

  // }

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
