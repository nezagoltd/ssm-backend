/**
 * @description it prepares and generate the mail body
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} verifyURL
 * @param {string} appURL
 * @returns {html} mailBodyHTML
 */
const generateVerifyEmailHTML = (firstName, lastName, verifyURL, appURL) => `
<div style="width: 70%; margin: 0 auto; font-family: sans-serif;">
  <nav style="background-color: #c4c4c4; padding: 0.1rem;">
    <h1 style="text-align: center;">SSM needs you to verify your email address</h1>
  </nav>

  <div style="padding: 2rem;">
    <h2>Hi ${firstName} ${lastName}!</h2>

    
  <p>You recently registered on Social Saving Management (SSM), we sent you this email in order to verify if the email you provided us is viable,
      for the sake of security and better services you receive from SSM!</p>

  <p>Kindly click the button below, so that we will know that this email belongs to you. Keep in mind that you need to always remember your email
    and password you used and don’t share it with anyone else!</p>

  <div style="padding: 1rem 0 1rem 0;">
  <a href="${verifyURL}" style="background-color: #861A02; color: #ffffff; width: 40%; padding: 0.8rem; text-decoration: none; border-radius: 0.2rem;">
    Verify email address</a>
  </div>

    <p>If you didn’t register on Social Saving Management system recently,
    we are sorry for that inconvenience, ignore this email!</p>

    <div>
      <p>Yours truly,</p>
      <p>Social Saving Management</p>
    </div>
  </div>
  <footer style="background-color: #c4c4c4; padding: 0.1rem">
    <p style="text-align: center; font-size: 0.8rem;">© 2021 <a href="${appURL}">SSM</a>. All rights reserved.</p>
  </footer>
</div>
  `;

/**
 * @param {object} userData
 * @param {object} token
 * @param {object} appURL
 * @returns {object} verifyEmailContent
 * @description It returns the verify email address message content
 */
export const generateVerifyEmailContent = (userData, token, appURL) => {
  const { firstName, lastName } = userData;
  const verifyURL = `${appURL}/api/users/verify-email?token=${token}`;
  const verifyEmailContentHTML = generateVerifyEmailHTML(firstName, lastName, verifyURL, appURL);

  const verifyEmailContentPlainText = `
    Note: If you cannot see this email properly, please use a browser
    SSM needs you to verify your email address

    Hello ${firstName} ${lastName}!

    You recently registered on Social Saving Management (SSM), we sent you this email in order to verify if the email you provided us is viable,
      for the sake of security and better services you receive from SSM!

    Kindly click the link below, so that we will know that this email belongs to you. Keep in mind that you need to always remember your email
      and password you used and don’t share it with anyone else!

    ${verifyURL}

    If you didn’t register on Social Saving Management system recently, we are sorry for that inconvenience, ignore this email!

    Yours truly,
    Social Saving Management
  `;
  return { verifyEmailContentHTML, verifyEmailContentPlainText };
};

/**
 * @description It prepares and generate email for approval
 * @param {string} adminFName
 * @param {string} adminLName
 * @param {string} approveURL
 * @param {string} appURL
 * @returns {html} mailBodyHTML
 */
const generateApproveEmailHTML = (adminFName, adminLName, approveURL, appURL) => `
<div style="width: 70%; margin: 0 auto; font-family: sans-serif;">
    <nav style="background-color: #c4c4c4; padding: 0.1rem;">
      <h1 style="text-align: center;">Approve a new user of SSM</h1>
    </nav>

    <div style="padding: 2rem;">
      <h2>Hello ${adminFName} ${adminLName}!</h2>

      <p>There is new user who has been registered on SSM, please check that user if he/she is allowed to be on SSM.
      Click the link below to read more about that user.</p>

      <p>Before approving this user, please read carefully if this user is the right person who should be on the system.
      You can assign him/her a new role, otherwise he/she will be an accountant by default.</p>

      <div style="padding: 1rem 0 1rem 0;">
        <a href="${approveURL}" style="background-color: #861A02; color: #ffffff; width: 40%; padding: 0.8rem; text-decoration: none; border-radius: 0.2rem;">
          Check new account</a>
      </div>

      <p>Please note that if this account is not approved for seven (7) days,
      it will be removed from the system automatically!</p>

      <div>
        <p>Yours truly,</p>
        <p>Social Saving Management</p>
      </div>
    </div>
    <footer style="background-color: #c4c4c4; padding: 0.1rem">
      <p style="text-align: center; font-size: 0.8rem;">© 2021 <a href="${appURL}">SSM</a>. All rights reserved.</p>
    </footer>
  </div>
`;

/**
 * @param {object} userData
 * @param {object} adminData
 * @param {object} appURL
 * @returns {object} verifyEmailContent
 * @description It returns the approve email address message content
 */
export const generateApproveEmailContent = (userData, adminData, appURL) => {
  const { id: userId } = userData;
  const { firstName: adminFName, lastName: adminLName } = adminData;
  const approveURL = `${appURL}/api/users/approve-user?userId=${userId}`;
  const approveUserEmailContentHTML = generateApproveEmailHTML(
    adminFName, adminLName, approveURL, appURL,
  );

  const approveUserEmailContentPlainText = `
    Note: If you cannot see this email properly, please use a browser
    SSM needs you to verify your email address

    Hello ${adminFName} ${adminLName}!

    There is new user who has been registered on SSM, please check that user if he/she is allowed to be on SSM.
      Click the link below to read more about that user.

      Before approving this user, please read carefully if this user is the right person who should be on the system.
      You can assign him/her a new role, otherwise he/she will be an accountant by default.

    ${approveURL}

    Please note that if this account is not approved for seven (7) days,
      it will be removed from the system automatically!
    
    Yours truly,
    Social Saving Management
  `;
  return {
    approveUserEmailContentHTML,
    approveUserEmailContentPlainText,
  };
};
