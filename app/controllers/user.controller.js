import dotenv from 'dotenv';
import services from '../services';
import { successCodes, failureCodes } from '../helpers/statusCodes.helper';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/response.helper';
import { encryptPassword } from '../helpers/passwordEncDec.helper';
import { generateToken } from '../helpers/token.helper';
import { successMessages, errorMessages } from '../helpers/messages.helper';
import { generateVerifyEmailContent } from '../helpers/mail/mailerMessageContent.helper';
import sendEmail from '../helpers/mailer.helper';

dotenv.config();

const { UserServiceInstance } = services;
const { created, ok } = successCodes;
const { badRequest, internalServerError, notFound } = failureCodes;
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
 * @class
 */
class UserController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /users
   */
  all = async (req, res) => {
    const { whereCondition } = req;
    const gottenUsers = await UserServiceInstance.getAll(whereCondition);
    if (gottenUsers) {
      sendSuccessResponse(res, ok, 'Unapproved user found', null, gottenUsers);
    } else {
      sendErrorResponse(res, notFound, 'No un-approved account found');
    }
  }

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
        res, created, accountCreatedTemporary, null, null,
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
   * @param {object} next
   * @returns {void}
   * @description PATCH | GET: /users/userId
   */
  update = async (req, res, next) => {
    const { dataToUpdate, whereCondition } = req;
    const userUpdateInfo = await UserServiceInstance.updateBy(dataToUpdate, whereCondition);
    if (userUpdateInfo) {
      res.statusCode = ok;
      next();
    } else {
      res.statusCode = internalServerError;
      next();
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