import nodemailer from 'nodemailer';
// const config = require('config.json');
import * as config from './config.json';

export default  class SendEmail {
  public static async sendEmail({ to, subject, html, from = config.emailFrom }) {
    const transporter = nodemailer.createTransport(config.smtpOptions);
    await transporter.sendMail({ from, to, subject, html });
  }
}
// module.exports = SendEmail;
