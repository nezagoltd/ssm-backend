import services from '../services';
import { successCodes, failureCodes } from '../helpers/statusCodes.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/response.helper';
import { successMessages, errorMessages } from '../helpers/messages.helper';

const { AccountTypeServiceInstance } = services;
const { created, ok } = successCodes;
const { internalServerError, notFound } = failureCodes;
const {
  recordCreateSuccess,
  recordFound,
  updateSuccess,
  deleteRecordSuccess,
} = successMessages;
const {
  noRecordFound,
  deleteRecordFail,
  recordCreateFail,
  updateFail,
} = errorMessages;

/**
 * @class
 */
class AccountTypeController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /account-types
   */
  all = async (req, res) => {
    const gottenAccountType = await AccountTypeServiceInstance.getAll();
    if (gottenAccountType.count > 0) {
      sendSuccessResponse(res, ok, recordFound, null, gottenAccountType);
    } else {
      sendErrorResponse(res, notFound, noRecordFound);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description POST: /account-types/create
   */
  create = async (req, res) => {
    const createdAccountType = await AccountTypeServiceInstance.saveAll(req.body);
    if (createdAccountType) {
      sendSuccessResponse(res, created, recordCreateSuccess, null, createdAccountType);
    } else {
      sendErrorResponse(res, internalServerError, recordCreateFail);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /account-types/all/:accountTypeId
   */
  show = async (req, res) => {
    let foundAccountType = await AccountTypeServiceInstance
      .getBy({ id: req.params.accountTypeId });
    if (foundAccountType) {
      foundAccountType = foundAccountType.dataValues;
      sendSuccessResponse(res, ok, recordFound, null, foundAccountType);
    } else {
      sendErrorResponse(res, notFound, noRecordFound);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {void}
   * @description PATCH: /account-types/update/:accountTypeId
   */
  update = async (req, res) => {
    const dataToUpdate = req.body;
    const whereCondition = { id: req.params.accountTypeId };
    const typeUpdateInfo = await AccountTypeServiceInstance.updateBy(dataToUpdate, whereCondition);
    if (typeUpdateInfo[0]) {
      sendSuccessResponse(res, ok, updateSuccess, null, typeUpdateInfo);
    } else {
      sendErrorResponse(res, internalServerError, updateFail);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description DELETE: /account-types/:accountTypeId
   */
  delete = async (req, res) => {
    const deletedAccountType = await AccountTypeServiceInstance
      .temporaryDelete({ id: req.params.accountTypeId });
    if (deletedAccountType) {
      sendSuccessResponse(res, ok, deleteRecordSuccess, null, null);
    } else {
      sendErrorResponse(res, internalServerError, deleteRecordFail);
    }
  }
}

export default AccountTypeController;
