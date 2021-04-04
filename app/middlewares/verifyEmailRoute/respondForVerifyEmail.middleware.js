import { successCodes, failureCodes } from '../../helpers/statusCodes.helper';
import { sendSuccessResponse, sendErrorResponse } from '../../helpers/response.helper';
import { successMessages, errorMessages } from '../../helpers/messages.helper';

const { ok } = successCodes;
const { internalServerError } = failureCodes;
const { approveEmailAddressToAdmin } = successMessages;
const { userFailedToUpdate } = errorMessages;

/**
 * @description it sends response to the verify email route
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
const respondAfterVerifyingEmail = (req, res) => {
  const { statusCode } = res;
  if (statusCode === ok) {
    sendSuccessResponse(res, ok, approveEmailAddressToAdmin, null, null);
  } else if (statusCode === internalServerError) {
    sendErrorResponse(res, internalServerError, userFailedToUpdate);
  }
};

export default respondAfterVerifyingEmail;
