import services from '../../services';
import { isPasswordTrue } from '../../helpers/passwordEncDec.helper';

const { UserServiceInstance } = services;

/**
 * @description It checks if the credentials
 * have been passed in the request body and retrieve that user from db
 * @param {req} req
 * @returns {object} result
 */
const getUser = async req => {
  const { email, password } = req.body;
  const result = { foundUser: null };
  if (email && password) {
    const { dataValues: userFromDb } = await UserServiceInstance.getBy({ email });
    if (userFromDb) {
      result.foundUser = userFromDb;
    }
  }
  return result;
};

/**
 * @description it checks the credentials and allow to go to the next step if they are right
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void}
 */
const checkCredentials = async (req, res, next) => {
  const { password } = req.body;
  const result = { userData: null };
  const { foundUser } = await getUser(req);
  if (foundUser) {
    if (isPasswordTrue(password, foundUser.password)) {
      result.userData = foundUser;
    }
  }
  req.userFromDb = result.userData;
  next();
};

export default checkCredentials;