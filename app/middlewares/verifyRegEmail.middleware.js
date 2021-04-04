import services from '../services';
import { decodeToken } from '../helpers/token.helper';

const { UserServiceInstance } = services;

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
 * @description it sets data for verifying email of a new registrant
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void}
 */
const verifyEmail = async (req, res, next) => {
  const mUser = await setUser(req.query.token, UserServiceInstance);
  req.dataToUpdate = { isVerified: true };
  req.whereCondition = { id: mUser.id };
  next();
};

export default verifyEmail;