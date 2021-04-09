import { sendSuccessResponse, sendErrorResponse } from '../../helpers/response.helper';
import { failureCodes, successCodes } from '../../helpers/statusCodes.helper';
import { successMessages, errorMessages } from '../../helpers/messages.helper';

const { ok } = successCodes;
const { notFound } = failureCodes;
const { userFailedToUpdate } = errorMessages;
const { updateSuccess } = successMessages;

/**
 * @description it sets data for approving new user
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void}
 */
const sendResponseAfterUserUpdate = async (req, res) => {
  const { statusCode } = res;
  if (statusCode === ok) {
    sendSuccessResponse(res, ok, updateSuccess, null, null);
  } else {
    sendErrorResponse(res, notFound, userFailedToUpdate);
  }
};

export default sendResponseAfterUserUpdate;
