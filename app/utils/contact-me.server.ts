import type {Contact} from '@prisma/client';
import {prisma} from './db.server';

export const createContact = (
  contact: Pick<Contact, 'email' | 'fullname' | 'message'>,
) => {
  return prisma.contact.create({
    data: contact,
  });
};
