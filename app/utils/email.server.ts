import nodemailer from 'nodemailer';
import {singleton} from './singleton.server';

function getTransporter() {
  const {
    NODEMAILER_HOST,
    NODEMAILER_PORT,
    NODEMAILER_USER,
    NODEMAILER_PASSWORD,
    NODEMAILER_IS_SECURE,
  } = process.env;

  if (
    !NODEMAILER_HOST ||
    !NODEMAILER_PORT ||
    !NODEMAILER_USER ||
    !NODEMAILER_PASSWORD
  ) {
    // throw new Error('Missing nodemailer configuration');
  }

  return nodemailer.createTransport({
    host: NODEMAILER_HOST,
    port: Number(NODEMAILER_PORT), // 465
    secure: NODEMAILER_IS_SECURE === 'true', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASSWORD,
    },
  });
}

const transporter = singleton('transporter', getTransporter);

export {transporter};
