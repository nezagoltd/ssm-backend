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

const { User, Role } = models;

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

/**
 * @description It prepares superadmin role
 * @returns {object} superadmin data
 */
const superadminRolePrepare = () => ({ name: 'super-admin' });

/**
 * @description It prepares superadmin association data
 * @returns {object} association data
 */
const superadminAssociationRolePrepare = () => {};

/**
   * @description Saves superuser object in the database
   * @returns {void}
   */
const registerAdmin = async () => {
  const dataToInsert = await superadminPrepare();
  await User.create(
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
};

/**
  * @description Saves superuser object in the database
  * @returns {void}
  */
const registerSuperadminRole = async () => {
  const dataToInsert = superadminRolePrepare();
  await Role.create(
    dataToInsert,
    {
      fields: [
        'name',
      ],
    },
  );
};

registerAdmin();
registerSuperadminRole();
export default registerAdmin;
