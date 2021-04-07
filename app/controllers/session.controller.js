import { generateToken } from '../helpers/token.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/response.helper';
import { successCodes, failureCodes } from '../helpers/statusCodes.helper';
import { successMessages, errorMessages } from '../helpers/messages.helper';

const { ok } = successCodes;
const { unAuthorized } = failureCodes;
const { loginFail } = errorMessages;
const { loginSuccess } = successMessages;

/**
 * @class
 */
class SessionController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description POST: /login
   */
  create = (req, res) => {
    const { userFromDb } = req;
    if (userFromDb) {
      const token = generateToken(userFromDb);
      sendSuccessResponse(res, ok, loginSuccess, token, null);
    } else {
      sendErrorResponse(res, unAuthorized, loginFail);
    }
  }

  // /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description DELETE: /users/userId
  //  */
  // delete = (req, res) => {}
}

export default SessionController;
