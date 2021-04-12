import services from '../services';
import { successCodes, failureCodes } from '../helpers/statusCodes.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/response.helper';
import { successMessages, errorMessages } from '../helpers/messages.helper';

const { MemberTypeServiceInstance } = services;
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
class MemberTypeController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /member-types
   */
  all = async (req, res) => {
    const gottenMemberType = await MemberTypeServiceInstance.getAll();
    if (gottenMemberType.count > 0) {
      sendSuccessResponse(res, ok, recordFound, null, gottenMemberType);
    } else {
      sendErrorResponse(res, notFound, noRecordFound);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description POST: /member-types/create
   */
  create = async (req, res) => {
    const createdMemberType = await MemberTypeServiceInstance.saveAll(req.body);
    if (createdMemberType) {
      sendSuccessResponse(res, created, recordCreateSuccess, null, createdMemberType);
    } else {
      sendErrorResponse(res, internalServerError, recordCreateFail);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /member-types/all/:memberTypeId
   */
  show = async (req, res) => {
    let foundAccountType = await MemberTypeServiceInstance
      .getBy({ id: req.params.memberTypeId });
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
   * @description PATCH: /member-types/update/:memberTypeId
   */
  update = async (req, res) => {
    const dataToUpdate = req.body;
    const whereCondition = { id: req.params.memberTypeId };
    const typeUpdateInfo = await MemberTypeServiceInstance.updateBy(dataToUpdate, whereCondition);
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
   * @description DELETE: /member-types/:memberTypeId
   */
  delete = async (req, res) => {
    const deletedAccountType = await MemberTypeServiceInstance
      .temporaryDelete({ id: req.params.memberTypeId });
    if (deletedAccountType) {
      sendSuccessResponse(res, ok, deleteRecordSuccess, null, null);
    } else {
      sendErrorResponse(res, internalServerError, deleteRecordFail);
    }
  }
}

export default MemberTypeController;
