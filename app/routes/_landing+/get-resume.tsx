import {json} from '@remix-run/server-runtime';
import {downloadFileToBase64} from '~/utils/ftp.server';

export const loader = async () => {
  const file = await downloadFileToBase64('me.pdf');

  return json({data: file});
};
