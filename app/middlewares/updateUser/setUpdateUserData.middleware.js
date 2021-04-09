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
 * @description it sets data for approving new user
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void}
 */
const dataForUpdatingUser = async (req, res, next) => {
  const { userId } = req.params;
  const isUserFound = await isUserExists(userId, res);
  if (isUserFound) {
    const whereCondition = { id: userId };
    const dataToUpdate = req.body;
    req.dataToUpdate = dataToUpdate;
    req.whereCondition = whereCondition;
    next();
  }
};

export default dataForUpdatingUser;
