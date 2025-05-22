import nodemailer from 'nodemailer';
import { config } from '../config/config';

const PORT = config.mailing.smptPort;

const transporter = nodemailer.createTransport({
  host: config.mailing.smptHost,
  port: PORT,
  secure: Number(PORT) === 465,
  auth: {
    user: config.mailing.user,
    pass: config.mailing.pass
  }
});

export async function sendMail() {
  try {
    const info = await transporter.sendMail({
      from: config.mailing.user,
      to: 'many.d.r.o.2001@gmail.com',
      subject: 'Hello ✔',
      text: 'Hello world?', // plain‑text body
      html: '<b>Hello world?</b>' // HTML body
    });

    console.log('Message sent:', info.messageId);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
}
