import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

/**
 * @param {Object} mailData - Email information
 * @returns {void}
 * @description it sends email to passed data
 */
const sendEmail = async (mailData) => {
  const {
    mailSentTo,
    mailSubject,
    contentText,
    contentHTML,
  } = mailData;

  const { APPLICATION_EMAIL, APPLICATION_EMAIL_PASSWORD } = process.env;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: APPLICATION_EMAIL,
      pass: APPLICATION_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailConfigs = {
    from: APPLICATION_EMAIL,
    to: mailSentTo,
    subject: mailSubject,
    html: contentHTML,
    text: contentText,
  };

  let isSent;

  try {
    isSent = await transporter.sendMail(mailConfigs, (err, sendResult) => {
      let result;
      if (err) {
        result = false;
      } else if (sendResult) {
        result = true;
      }
      return result;
    });
  } catch (error) {
    throw new Error(
      `Something went wrong in the sendmail method. Error: ${error.message}`,
    );
  }
  return isSent;
};

export default sendEmail;