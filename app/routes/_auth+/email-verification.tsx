import {Button} from '@/components/ui/button';
import {json, LoaderFunctionArgs} from '@remix-run/node';
import {Link, useLoaderData} from '@remix-run/react';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {getUser, updateUser} from '~/utils/user.server';

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {JWT_SECRET, SESSION_SECRET} = process.env;
  const {url} = request;
  const {searchParams} = new URL(url);
  const token = searchParams.get('token');

  if (!token) {
    return json({error: true, message: 'Token is required'}, {status: 400});
  }

  try {
    const decoded = jwt.verify(
      token,
      (JWT_SECRET || SESSION_SECRET) as string,
    ) as JwtPayload;
    const {userId} = decoded;

    if (!userId) {
      return json({message: 'Invalid token', error: true}, {status: 400});
    }

    const user = await getUser(userId);

    if (!user) {
      return json({message: 'User not found', error: true}, {status: 404});
    }

    await updateUser(userId, {verifiedAt: new Date()});

    return json({error: false, message: 'Email verified'});
  } catch (error) {
    return json({message: 'Invalid token', error: true}, {status: 400});
  }
};

export default function EmailVerificationPage() {
  const loaderData = useLoaderData<typeof loader>();

  if (loaderData.error) {
    return <div>{loaderData.message}</div>;
  }

  return (
    <div>
      <h1>Adresse email vérifié avec succès</h1>
      <p>Vous pouvez maintenant vous connecter</p>

      <Link to="/login">
        <Button>Se connecter</Button>
      </Link>
    </div>
  );
}
