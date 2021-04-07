import dataForVerifyEmail from './verifyEmailRoute/verifyRegEmail.middleware';
import respondAfterVerifyingEmail from './verifyEmailRoute/respondForVerifyEmail.middleware';
import dataForApprovingUser from './approveUserRoute/approveUserData.middleware';
import checkCredentials from './loginRoute/checkCredentials.middleware';

export default {
  dataForVerifyEmail,
  respondAfterVerifyingEmail,
  dataForApprovingUser,
  checkCredentials,
};
