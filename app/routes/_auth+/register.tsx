import {cn} from '@/lib/utils.ts';
import {Form, Link, MetaFunction, useActionData} from '@remix-run/react';
import {Button, buttonVariants} from '@/components/ui/button.tsx';
import {Field} from '@/components/ui/forms.tsx';
import {getInputProps, useForm} from '@conform-to/react';
import {getZodConstraint, parseWithZod} from '@conform-to/zod';
import {z} from 'zod';
import {ActionFunctionArgs} from '@remix-run/node';
import 'external-svg-loader';

import {
  getUserByEmail,
  getUserByUsername,
  registerUser,
} from '~/utils/user.server';
import {useEffect} from 'react';

export const meta: MetaFunction = () => [{title: 'SMSmart | Créer un compte'}];

export const RegisterSchema = z
  .object({
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['passwordConfirmation'],
  });

export const action = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {schema: RegisterSchema});

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const {password, username, email} = submission.value;
  let user = await getUserByEmail(email);

  if (user) {
    return submission.reply({
      fieldErrors: {email: ['Adresse email déjà lié à un compte']},
    });
  }

  user = await getUserByUsername(username);

  if (user) {
    return submission.reply({
      fieldErrors: {username: ["Nom d'utilisateur déjà pris"]},
    });
  }

  const createdUser = await registerUser({email, username, password});

  if (!createdUser) {
    return submission.reply({
      formErrors: [
        'Une erreur est survenue lors de la création de votre compte',
      ],
    });
  }

  return null;
};

export default function RegisterPage() {
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    id: 'register-form',
    constraint: getZodConstraint(RegisterSchema),
    onValidate({formData}) {
      return parseWithZod(formData, {schema: RegisterSchema});
    },
    shouldRevalidate: 'onBlur',
  });

  useEffect(() => {
    // Reset the form if the user was successfully registered
    if (lastResult === null) {
      form.reset();
    }
  }, [lastResult]);

  return (
    <>
      <div className="container relative h-screen flex flex-col justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/login"
          className={cn(
            buttonVariants({variant: 'ghost'}),
            'absolute right-4 top-4 md:right-8 md:top-8',
          )}
        >
          Se connecter
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
                Créer un compte
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
                  inputProps={{
                    ...getInputProps(fields.email, {type: 'email'}),
                    placeholder: 'email@example.com',
                  }}
                  labelProps={{children: 'Adresse email'}}
                  errors={fields.email.errors}
                />
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

                <Field
                  inputProps={getInputProps(fields.passwordConfirmation, {
                    type: 'password',
                  })}
                  labelProps={{children: 'Mot de passe'}}
                  errors={fields.passwordConfirmation.errors}
                />
                <Button type="submit">Créer mon compte</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
