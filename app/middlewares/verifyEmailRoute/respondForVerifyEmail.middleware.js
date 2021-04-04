import dotenv from 'dotenv';
import { successCodes, failureCodes } from '../../helpers/statusCodes.helper';
import { sendSuccessResponse, sendErrorResponse } from '../../helpers/response.helper';
import { successMessages, errorMessages, generateApproveEmailContent } from '../../helpers/messages.helper';
import sendEmail from '../../helpers/mailer.helper';

dotenv.config();

const { ok } = successCodes;
const { internalServerError } = failureCodes;
const { approveEmailAddressToAdmin } = successMessages;
const { userFailedToUpdate } = errorMessages;
const {
  SUPERADMIN_EMAIL, SUPERADMIN_FNAME, SUPERADMIN_LNAME, APPLICATION_URL,
} = process.env;

/**
 * @description it sends response to the verify email route
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
const respondAfterVerifyingEmail = async (req, res) => {
  const { statusCode } = res;
  if (statusCode === ok) {
    const { id } = req.whereCondition;
    const {
      approveUserEmailContentHTML,
      approveUserEmailContentPlainText,
    } = generateApproveEmailContent(
      { id }, { firstName: SUPERADMIN_FNAME, lastName: SUPERADMIN_LNAME }, APPLICATION_URL,
    );
    await sendEmail(
      {
        mailSentTo: SUPERADMIN_EMAIL,
        mailSubject: 'Approve a new user on SSM',
        contentHTML: approveUserEmailContentHTML,
        contentText: approveUserEmailContentPlainText,
      },
    );
    sendSuccessResponse(res, ok, approveEmailAddressToAdmin, null, null);
  } else if (statusCode === internalServerError) {
    sendErrorResponse(res, internalServerError, userFailedToUpdate);
  }
};

export default respondAfterVerifyingEmail;
