import dotenv from 'dotenv';
import _ from 'lodash';
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
const { accountCreatedTemporary, recordFound, deleteRecordSuccess } = successMessages;
const { accountFailedToCreate, noRecordFound, deleteRecordFail } = errorMessages;
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
    if (gottenUsers.count > 0) {
      sendSuccessResponse(res, ok, recordFound, null, gottenUsers);
    } else {
      sendErrorResponse(res, notFound, noRecordFound);
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
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description GET: /users/:userId
   */
  show = async (req, res) => {
    let foundUser = await UserServiceInstance.getBy({ id: req.params.userId });
    if (foundUser) {
      foundUser = foundUser.dataValues;
      foundUser = _.omit(foundUser, 'password');
      sendSuccessResponse(res, ok, recordFound, null, foundUser);
    } else {
      sendErrorResponse(res, notFound, noRecordFound);
    }
  }

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
    if (userUpdateInfo[0]) {
      res.statusCode = ok;
      next();
    } else {
      res.statusCode = internalServerError;
      next();
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {void}
   * @description DELETE: /users/:userId
   */
  delete = async (req, res) => {
    const deletedUser = await UserServiceInstance.temporaryDelete({ id: req.params.userId });
    if (deletedUser) {
      sendSuccessResponse(res, ok, deleteRecordSuccess, null, deletedUser);
    } else {
      sendErrorResponse(res, internalServerError, deleteRecordFail);
    }
  }
}

export default UserController;