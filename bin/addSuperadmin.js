import dotenv from 'dotenv';
import services from '../app/services';
import { encryptPassword } from '../app/helpers/passwordEncDec.helper';

dotenv.config();

const {
  SUPERADMIN_FNAME,
  SUPERADMIN_LNAME,
  SUPERADMIN_PASSWORD,
  SUPERADMIN_EMAIL,
} = process.env;

const { UserRoleServiceInstance, RoleServiceInstance, UserServiceInstance } = services;

/**
 * @description It prepares superadmin data
 * @returns {object} adminDataObject
 *
 */
const superadminPrepare = async () => {
  const passcode = await encryptPassword(SUPERADMIN_PASSWORD);
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
    await UserServiceInstance.saveAll(dataToInsert);
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
    await RoleServiceInstance.saveAll(dataToInsert);
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * @description It prepares superadmin association data
 * @returns {object} association data
 */
const superadminAssociationRolePrepare = async () => {
  const superuserData = await UserServiceInstance.getBy({ email: SUPERADMIN_EMAIL });
  const superuserRole = await RoleServiceInstance.getBy({ name: 'super-admin' });
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
    await UserRoleServiceInstance.saveAll(dataToInsert);
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
