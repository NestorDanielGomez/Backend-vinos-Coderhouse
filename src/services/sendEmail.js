import Config from '../config';
import nodemailer from 'nodemailer';

const owner = {
    name: Config.GMAIL_NAME,
    address: Config.GMAIL_EMAIL,
  };
  
  const gmailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: Config.GMAIL_EMAIL,
      pass: Config.GMAIL_PASSWORD,
    },
  });
  
  const notifyByEmail = async (userData) => {
    const mailOptions = {
      from: owner,
      to: Config.GMAIL_EMAIL,
      subject: 'Nueva orden creada',
      html: `Nueva orden creada.\n\n\n ${userData}`,
    };
    const response = await gmailTransporter.sendMail(mailOptions);
    return response;
  };
  
  export const NotificationEmail = {
    notifyByEmail,
  };
  