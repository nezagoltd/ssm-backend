import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

/**
 * sendEmail
 * @param {Object} mailData - Email information
 * @returns {void}
 * @description it sends email to passed data
 */
const sendEmail = async (mailData) => {
  const {
    from, to, mailSubject, mailContent,
  } = mailData;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html: {
        path: path.resolve(__dirname, '../template/mail.html'),
      }, // html body
    });

    console.log(`Message sent: ${info.messageId}`);
    return `Message sent: ${info.messageId}`;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Something went wrong in the sendmail method. Error: ${error.message}`,
    );
  }
};
