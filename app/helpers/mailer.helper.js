import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

/**
 * @description it prepares email data
 * @param {object} mailData
 * @param {string} applicationEmail
 * @returns {object} emailData
 */
const prepareEmailConfigs = (mailData) => {
  const {
    mailSentTo, mailSubject, contentText, contentHTML,
  } = mailData;
  const { APPLICATION_EMAIL, APPLICATION_EMAIL_PASSWORD } = process.env;

  const mailConfigs = {
    from: APPLICATION_EMAIL,
    to: mailSentTo,
    subject: mailSubject,
    html: contentHTML,
    text: contentText,
  };

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

  return { mailConfigs, transporter };
};

/**
 * @param {Object} mailData - Email information
 * @returns {void}
 * @description it sends email to passed data
 */
const sendEmail = async (mailData) => {
  const { mailConfigs, transporter } = prepareEmailConfigs(mailData);

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
  } catch (err) {
    throw new Error(
      `Something went wrong in the sendmail method. Error: ${err.message}`,
    );
  }
  return isSent;
};

export default sendEmail;