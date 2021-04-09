import dataForVerifyEmail from './verifyEmailRoute/verifyRegEmail.middleware';
import respondAfterVerifyingEmail from './verifyEmailRoute/respondForVerifyEmail.middleware';
import dataForApprovingUser from './approveUserRoute/approveUserData.middleware';
import checkCredentials from './loginRoute/checkCredentials.middleware';
import unapprovedUserData from './unapprovedUserRoute/unapprovedUser.middleware';
import setDataForUpdatingUser from './updateUser/setUpdateUserData.middleware';
import sendResponseAfterUserUpdate from './updateUser/respondAfterUpdate.middleware';

export default {
  dataForVerifyEmail,
  respondAfterVerifyingEmail,
  dataForApprovingUser,
  checkCredentials,
  unapprovedUserData,
  setDataForUpdatingUser,
  sendResponseAfterUserUpdate,
};
