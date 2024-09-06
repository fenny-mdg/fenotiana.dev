import {User} from '@prisma/client';
import bcrypt from 'bcryptjs';
import {render} from '@react-email/components';
import jwt from 'jsonwebtoken';

import {prisma} from './db.server';
import {OptionalExceptFor} from './type';
import {transporter} from './email.server';
import {RegisterConfirmationTemplate} from './email-template';

const {
  NODEMAILER_USER,
  NODEMAILER_SENDER_NAME,
  APP_DOMAIN,
  JWT_SECRET,
  SESSION_SECRET,
  APP_PORT = 3000,
} = process.env;

export const getUserByEmail = async (email: User['email']) =>
  prisma.user.findUnique({where: {email: email.toLowerCase()}});

export const getUserByUsername = async (username: User['username']) =>
  prisma.user.findUnique({where: {username: username.toLowerCase()}});

export const registerUser = async ({
  email,
  username,
  password,
}: OptionalExceptFor<User, 'email' | 'username'> & {password: string}) => {
  let user: Partial<User> | null = null;

  try {
    user = await prisma.user.create({
      select: {id: true},
      data: {
        email,
        username: username.toLowerCase(),
        // name,
        password: {create: {hash: bcrypt.hashSync(password, 10)}},
        // roles: {connect: [{name: 'admin'}, {name: 'user'}]},
      },
    });
    const host = APP_DOMAIN
      ? `https://${APP_DOMAIN}`
      : `http://localhost:${APP_PORT}`;
    const verificationToken = jwt.sign(
      {userId: user.id},
      (JWT_SECRET || SESSION_SECRET) as string,
      {
        expiresIn: 900,
      },
    );

    const verificationLink = `${host}/email-verification?token=${verificationToken}`;
    const emailBody = render(
      <RegisterConfirmationTemplate
        username={username}
        confirmationLink={verificationLink}
      />,
    );

    const emailData = {
      from: NODEMAILER_SENDER_NAME
        ? `"${NODEMAILER_SENDER_NAME}" <${NODEMAILER_USER}>`
        : NODEMAILER_USER,
      to: email,
      subject: 'Confirmation inscription',
      html: emailBody,
    };

    await transporter.sendMail(emailData);

    return user;
  } catch (error) {
    if (user?.id) {
      // Rollback user creation
      await prisma.user.delete({where: {id: user.id}});
    }

    return null;
  }
};

export const getUser = (userId: User['id']) =>
  prisma.user.findUnique({where: {id: userId}});

export const updateUser = (id: User['id'], data: Partial<User>) =>
  prisma.user.update({where: {id}, data});
