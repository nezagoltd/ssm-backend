import services from '../services';
import { successCodes, failureCodes } from '../helpers/statusCodes.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/response.helper';
import { successMessages, errorMessages } from '../helpers/messages.helper';

const { InterestRateServiceInstance } = services;
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
class InterestRateController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /interest-rates
   */
  all = async (req, res) => {
    const gottenInterestRates = await InterestRateServiceInstance.getAll();
    if (gottenInterestRates.count > 0) {
      sendSuccessResponse(res, ok, recordFound, null, gottenInterestRates);
    } else {
      sendErrorResponse(res, notFound, noRecordFound);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description POST: /interest-rates/create
   */
  create = async (req, res) => {
    const createdRole = await InterestRateServiceInstance.saveAll(req.body);
    if (createdRole) {
      sendSuccessResponse(res, created, recordCreateSuccess, null, createdRole);
    } else {
      sendErrorResponse(res, internalServerError, recordCreateFail);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /interest-rates/all/:interestRateId
   */
  show = async (req, res) => {
    let foundInterestRate = await InterestRateServiceInstance
      .getBy({ id: req.params.interestRateId });
    if (foundInterestRate) {
      foundInterestRate = foundInterestRate.dataValues;
      sendSuccessResponse(res, ok, recordFound, null, foundInterestRate);
    } else {
      sendErrorResponse(res, notFound, noRecordFound);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {void}
   * @description PATCH: /interest-rates/update/:interestRateId
   */
  update = async (req, res) => {
    const dataToUpdate = req.body;
    const whereCondition = { id: req.params.interestRateId };
    const roleUpdateInfo = await InterestRateServiceInstance.updateBy(dataToUpdate, whereCondition);
    if (roleUpdateInfo[0]) {
      sendSuccessResponse(res, ok, updateSuccess, null, roleUpdateInfo);
    } else {
      sendErrorResponse(res, internalServerError, updateFail);
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description DELETE: /roles/:roleId
   */
  delete = async (req, res) => {
    const deletedInterestRate = await InterestRateServiceInstance
      .temporaryDelete({ id: req.params.roleId });
    if (deletedInterestRate) {
      sendSuccessResponse(res, ok, deleteRecordSuccess, null, null);
    } else {
      sendErrorResponse(res, internalServerError, deleteRecordFail);
    }
  }
}

export default InterestRateController;
