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

const { User, Role, UserRole } = models;

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
   * @description Saves superuser object in the database
   * @returns {void}
   */
const registerAdmin = async () => {
  const dataToInsert = await superadminPrepare();
  try {
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
  } catch (err) {
    throw new Error(err);
  }
};

/**
  * @description Saves superuser object in the database
  * @returns {void}
  */
const registerSuperadminRole = async () => {
  const dataToInsert = superadminRolePrepare();
  try {
    await Role.create(
      dataToInsert,
      {
        fields: [
          'name',
        ],
      },
    );
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * @description It prepares superadmin association data
 * @returns {object} association data
 */
const superadminAssociationRolePrepare = async () => {
  const superuserData = await User.findOne({ where: { email: SUPERADMIN_EMAIL } });
  const superuserRole = await Role.findOne({ where: { name: 'super-admin' } });
  if (superuserData === null) {
    registerAdmin();
  }
  if (superuserRole === null) {
    registerSuperadminRole();
  }
  return {
    userId: superuserData.id,
    roleId: superuserRole.id,
  };
};

/**
  * @description Saves superuser object in the database
  * @returns {void}
  */
const superadminAssociateWithHisRole = async () => {
  const dataToInsert = await superadminAssociationRolePrepare();
  try {
    await UserRole.create(
      dataToInsert,
      {
        fields: [
          'userId',
          'roleId',
        ],
      },
    );
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * @description It creates a superuser
 * @returns{void}
 */
const createSuperuser = async () => {
  await registerAdmin();
  await registerSuperadminRole();
  await superadminAssociateWithHisRole();
};

createSuperuser();
export default registerAdmin;
