import dotenv from 'dotenv';
import services from '../services';
import { successCodes, failureCodes } from '../helpers/statusCodes.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/response.helper';
import { encryptPassword } from '../helpers/passwordEncDec.helper';
import { decodeToken, generateToken } from '../helpers/token.helper';
import { successMessages, errorMessages, generateVerifyEmailContent } from '../helpers/messages.helper';
import sendEmail from '../helpers/mailer.helper';

dotenv.config();

const { UserServiceInstance } = services;
const { created, ok } = successCodes;
const { badRequest, internalServerError } = failureCodes;
const { accountCreatedTemporary } = successMessages;
const { accountFailedToCreate } = errorMessages;
const { APPLICATION_URL } = process.env;

/**
 * @description it gets a request and then it extracts user parameters from that request
 * @param {object} req
 * @returns {object} userParams
 */
const getUserParams = async req => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  const encryptedPassword = await encryptPassword(password);

  return {
    firstName, lastName, email, password: encryptedPassword,
  };
};

/**
 * @description It finds user from the database
 * @param {object} token
 * @param {object} userService
 * @returns {object} foundUser
 */
const setUser = async (token, userService) => {
  const { id } = decodeToken(token);
  const foundUser = await userService.getBy({ id });
  return foundUser;
};

/**
 * @class
 */
class UserController {
  /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description GET: /users
  //  */
  // all = (req, res) => {}

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description POST: /users
   */
  create = async (req, res) => {
    const dataToSave = await getUserParams(req);
    const { dataValues: savedUser } = await UserServiceInstance.saveAll(dataToSave);
    const token = generateToken(savedUser);
    const {
      verifyEmailContentHTML,
      verifyEmailContentPlainText,
    } = generateVerifyEmailContent(dataToSave, token, APPLICATION_URL);
    if (savedUser) {
      await sendEmail({
        mailSentTo: dataToSave.email,
        mailSubject: 'Verify your email address',
        contentHTML: verifyEmailContentHTML,
        contentText: verifyEmailContentPlainText,
      });
      sendSuccessResponse(
        res, created, accountCreatedTemporary, token, null,
      );
    } else {
      sendErrorResponse(res, badRequest, accountFailedToCreate);
    }
  }

  /**
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void}
  //  * @description GET: /users/userId
  //  */
  // show = (req, res) => {}

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description PATCH | GET: /users/userId
   */
  update = async (req, res) => {
    let mUser;
    if (req.query.token) {
      mUser = await setUser(req.query.token, UserServiceInstance);
    }
    const userUpdateInfo = await UserServiceInstance.updateBy(
      { isVerified: true }, { id: mUser.id },
    );
    if (userUpdateInfo) {
      sendSuccessResponse(res, ok, 'User updated successfully!', null, userUpdateInfo);
    } else {
      sendErrorResponse(res, internalServerError, 'User update failed!');
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

export default UserController;