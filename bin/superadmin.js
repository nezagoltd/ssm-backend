import dotenv from 'dotenv';
import models from '../app/models';
import { passwordEncryptor } from '../app/helpers/passwordEncDec.helper';

dotenv.config();

const {
  SUPERADMIN_FNAME,
  SUPERADMIN_LNAME,
  SUPERADMIN_PASSWORD,
  SUPERADMIN_EMAIL,
} = process.env;

/**
 * @description It prepares superadmin data
 * @returns {object} adminDataObject
 *
 */
const superadminPrepare = async () => {
  const passcode = await passwordEncryptor(SUPERADMIN_PASSWORD);
  const superadminData = {
    firstName: SUPERADMIN_FNAME,
    lastName: SUPERADMIN_LNAME,
    email: SUPERADMIN_EMAIL,
    password: passcode,
    isConfirmed: true,
  };
  return superadminData;
};

const { User } = models;
/**
   * @description Saves superuser object in the database
  //  * @param {object} superadminData User data to save to the database
   * @returns {object} dataValues User object that was saved to the database
    */
const registerAdmin = async () => {
  const dataToInsert = await superadminPrepare();
  const { dataValues } = await User.create(
    dataToInsert,
    {
      fields: [
        'firstName',
        'lastName',
        'email',
        'password',
        'isConfirmed',
      ],
    },
  );
  return dataValues;
};

registerAdmin();
export default registerAdmin;
