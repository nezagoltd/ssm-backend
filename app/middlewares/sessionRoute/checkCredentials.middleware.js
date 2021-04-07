import services from '../../services';

const { UserServiceInstance } = services;

/**
 * @description It checks if the credentials have been passed in the request body
 * @param {req} req
 * @returns {bool} result
 */
const validateIfCredentialsPassed = req => {
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
const checkCredentials = (req, res, next) => {
  const { email, password } = req.body;

};

export default checkCredentials;
