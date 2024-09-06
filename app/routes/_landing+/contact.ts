import {redirect} from '@remix-run/server-runtime';
import type {ActionFunction} from '@remix-run/server-runtime';
import invariant from 'tiny-invariant';
import {createContact} from '~/utils/contact-me.server';

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  const {fullname, email, message} = Object.fromEntries([...formData]);

  invariant(typeof fullname === 'string', 'fullname is required');
  invariant(typeof email === 'string', 'email is required');
  invariant(typeof message === 'string', 'message is required');

  await createContact({fullname, email, message});

  return redirect('/');
};
