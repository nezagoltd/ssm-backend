import services from '../../services';
import { isPasswordTrue } from '../../helpers/passwordEncDec.helper';

const { UserServiceInstance } = services;

/**
 * @description It checks if the credentials have been passed in the request body
 * @param {req} req
 * @returns {bool} result
 */
const isCredentialsPassed = req => {
  const { email, password } = req.body;
  if (email && password) {
    return true;
  }
  return false;
};

/**
 * @description it checks the credentials and allow to go to the next step if they are right
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void}
 */
const checkCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  const result = {};
  if (isCredentialsPassed(req)) {
    const { dataValues: userFromDb } = await UserServiceInstance.getBy({ email });
    if (userFromDb) {
      if (isPasswordTrue(password, userFromDb.password)) {
        result.userData = userFromDb;
      } else {
        result.userData = null;
      }
    } else {
      result.userData = null;
    }
  }
  req.userFromDb = result;
  return next;
};

export default checkCredentials;
