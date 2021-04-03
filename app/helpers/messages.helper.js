export const successMessages = {
  accountCreatedTemporary: 'Your account has been created temporary!\n\nWe have sent an email to your email address you provided, kindly check out your email, and click on the link within that email to verify your email addrdress.!\n\nPlease note that, if this account is not verified for 7 days, it will be removed from the system, you will need to create a new one!',
  approveEmailAddressToAdmin: 'Congratulations!\n\nYour account has been created temporary.!\n\nWe have sent an email to the system administrator, please wait for them to confirm your account.',
};
export const errorMessages = {
  accountFailedToCreate: 'Sorry!\nAccount was not created, something weird went wrong, please try again!',
};

/**
 * @param {object} userData
 * @param {object} token
 * @param {object} appURL
 * @returns {object} verifyEmailContent
 * @description It returns the verify email address message content
 */
export const generateVerifyEmailContent = (userData, token, appURL) => {
  const { firstName, lastName } = userData;
  const verifyURL = `${appURL}/users/verify-email?token=${token}`;
  const verifyEmailContentHTML = `
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

  const verifyEmailContentPlainText = `
    Note: If you cannot see this email properly, please use a browser
    SSM needs you to verify your email address

    Hello ${firstName} ${lastName}!

    You recently registered on Social Saving Management (SSM), we sent you this email in order to verify if the email you provided us is viable,
      for the sake of security and better services you receive from SSM!

    Kindly click the link below, so that we will know that this email belongs to you. Keep in mind that you need to always remember your email
      and password you used and don’t share it with anyone else!

    ${appURL}/users/verify-email?token=${token}

    If you didn’t register on Social Saving Management system recently, we are sorry for that inconvenience, ignore this email!

    
    Yours truly,
    Social Saving Management
  `;
  return { verifyEmailContentHTML, verifyEmailContentPlainText };
};
