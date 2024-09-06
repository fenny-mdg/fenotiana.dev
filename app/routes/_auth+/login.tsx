import {cn} from '@/lib/utils.ts';
import {Form, Link, MetaFunction, useActionData} from '@remix-run/react';
import {Button, buttonVariants} from '@/components/ui/button.tsx';
import {Field} from '@/components/ui/forms.tsx';
import {getInputProps, useForm} from '@conform-to/react';
import {getZodConstraint, parseWithZod} from '@conform-to/zod';
import {z} from 'zod';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import {safeRedirect} from 'remix-utils/safe-redirect';
import 'external-svg-loader';

import {getUserId, login, sessionKey} from '~/utils/auth.server.ts';
import {combineResponseInits} from '~/utils/misc.tsx';
import {authSessionStorage} from '~/utils/session.server.ts';

export const meta: MetaFunction = () => [{title: 'SMSmart - Se connecter'}];

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
  redirectTo: z.string().optional(),
  remember: z.boolean().optional(),
});

async function handleNewSession(
  {
    request,
    session,
    redirectTo,
    remember,
  }: {
    request: Request;
    session: {userId: string; id: string; expirationDate: Date};
    redirectTo?: string;
    remember: boolean;
  },
  responseInit?: ResponseInit,
) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get('cookie'),
  );
  authSession.set(sessionKey, session.id);

  return redirect(
    safeRedirect(redirectTo),
    combineResponseInits(
      {
        headers: {
          'set-cookie': await authSessionStorage.commitSession(authSession, {
            expires: remember ? session.expirationDate : undefined,
          }),
        },
      },
      responseInit,
    ),
  );
}

export const action = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {schema: LoginSchema});

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const {password, username, remember, redirectTo} = submission.value;
  const session = await login({username, password});

  if (!session) {
    return submission.reply({
      fieldErrors: {
        username: [
          'Nom d’utilisateur ou mot de passe incorrect ou compte non vérifié veuillez vérifier votre compte',
        ],
      },
    });
  }

  // get the password off the payload that's sent back
  delete submission.payload.password;

  return handleNewSession({
    request,
    session,
    remember: remember ?? false,
    redirectTo: redirectTo || '/app/dashboard',
  });
};

export const loader = async ({request}: LoaderFunctionArgs) => {
  const id = await getUserId(request);

  if (id) {
    return redirect('/app/dashboard');
  }

  return null;
};

export default function LoginPage() {
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    id: 'login-form',
    constraint: getZodConstraint(LoginSchema),
    onValidate({formData}) {
      return parseWithZod(formData, {schema: LoginSchema});
    },
    shouldRevalidate: 'onBlur',
  });

  return (
    <>
      <div className="container relative h-screen flex flex-col justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/register"
          className={cn(
            buttonVariants({variant: 'ghost'}),
            'absolute right-4 top-4 md:right-8 md:top-8',
          )}
        >
          Créer un compte
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-primary lg:flex dark:border-r">
          <div className="absolute inset-0 bg-white">
            <svg
              data-src="https://raw.githubusercontent.com/fenny-mdg/images/main/sms-campain/login.svg"
              fill="currentColor"
              className="w-full h-full"
            />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium ">
            {/* <Logo /> */}
            SMSmart
          </div>
        </div>
        <div className="lg:p-8 md:m-auto">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Se connecter
              </h1>
            </div>

            <div className={cn('grid gap-6')}>
              <Form
                className="grid gap-2"
                method="POST"
                id={form.id}
                aria-invalid={form.errors ? true : undefined}
                aria-describedby={form.errors ? form.errorId : undefined}
              >
                <Field
                  inputProps={getInputProps(fields.username, {type: 'text'})}
                  labelProps={{children: "Nom d'utilisateur"}}
                  errors={fields.username.errors}
                />

                <Field
                  inputProps={getInputProps(fields.password, {
                    type: 'password',
                  })}
                  labelProps={{children: 'Mot de passe'}}
                  errors={fields.password.errors}
                />
                <Button type="submit">Se connecter</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
