import { generateToken } from '../helpers/token.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/response.helper';
import { successCodes, failureCodes } from '../helpers/statusCodes.helper';
import { successMessages, errorMessages } from '../helpers/messages.helper';
import redisClient from '../../config/redis/redis.config';

const { ok } = successCodes;
const { unAuthorized } = failureCodes;
const { loginFail } = errorMessages;
const { loginSuccess } = successMessages;

/**
 * @class
 */
class LoginController {
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

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description DELETE: /logout
   */
  delete = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    redisClient.sadd('token', token);
    sendSuccessResponse(res, ok, 'Logged out successfully', null, null);
  }
}

export default LoginController;
