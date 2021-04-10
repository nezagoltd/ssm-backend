import services from '../../services';
import { sendErrorResponse } from '../../helpers/response.helper';
import { failureCodes } from '../../helpers/statusCodes.helper';
import { errorMessages } from '../../helpers/messages.helper';

const { notFound } = failureCodes;
const { noRecordFound } = errorMessages;

/**
 * @description It checks if user exists
 * @param {integer} id
 * @param {object} res
 * @returns {void}
 */
const isUserExists = async (id, res) => {
  const { UserServiceInstance } = services;
  const foundUser = await UserServiceInstance.getBy({ id });
  if (foundUser) {
    return true;
  }
  sendErrorResponse(res, notFound, noRecordFound);
  return false;
};

/**
 * @description it removes email and data from sent data
 * @param {object} data
 * @returns {object} data
 */
const removePasswordAndEmail = data => {
  const { email, password } = data;
  if (email) {
    delete data.email;
  }
  if (password) {
    delete data.password;
  }
  return data;
};

/**
 * @description it sets data for approving new user
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void}
 */
const setDataForUpdatingUser = async (req, res, next) => {
  const { userId } = req.params;
  const isUserFound = await isUserExists(userId, res);
  if (isUserFound) {
    const whereCondition = { id: userId };
    const dataToUpdate = removePasswordAndEmail(req.body);
    req.dataToUpdate = dataToUpdate;
    req.whereCondition = whereCondition;
    next();
  }
};

export default setDataForUpdatingUser;
