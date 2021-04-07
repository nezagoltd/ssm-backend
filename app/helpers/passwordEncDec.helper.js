import bcrypt from 'bcrypt';

/**
* @param {string} password
* @returns {string} hashedPassword
* @description Encrypts a plain-text password
*/
export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(14);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

/**
   *
   * @param {string} currPassword
   * @param {string} hashedPassword
   * @returns {bool} boolean
   * @description it returns a boolean about the password matching status
   */
export const decryptPassword = async (currPassword, hashedPassword) => {
  const isPasswordChecked = await bcrypt.compare(currPassword, hashedPassword);
  return isPasswordChecked;
};
