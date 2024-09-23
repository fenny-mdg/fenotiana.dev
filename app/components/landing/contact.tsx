import {Form, useActionData} from '@remix-run/react';
import {getInputProps, getTextareaProps, useForm} from '@conform-to/react';
import {z} from 'zod';
import {getZodConstraint, parseWithZod} from '@conform-to/zod';

import {action} from '~/routes/_landing+/contact';
import {useTranslation} from 'react-i18next';
// import Button from '../button/button';
// import Input from '../input/input';
// import Textarea from '../input/textarea';
import Title from '../title';
import Container from './container';
import {Field, TextareaField} from '@/components/ui/forms';
import {Button} from '@/components/ui/button';

export const ContactSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export default function Contact() {
  const {t} = useTranslation();
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    id: 'contact-form',
    constraint: getZodConstraint(ContactSchema),
    onValidate({formData}) {
      return parseWithZod(formData, {schema: ContactSchema});
    },
    shouldRevalidate: 'onBlur',
  });

  return (
    <Container className="!h-fit flex-col p-8">
      <Title>{t('contact.title')}</Title>
      <Form
        className="flex flex-col h-fit w-full flex-wrap"
        method="post"
        action="/contact"
        id={form.id}
        aria-invalid={form.errors ? true : undefined}
        aria-describedby={form.errors ? form.errorId : undefined}
      >
        <div className="flex gap-4">
          <Field
            className="flex-1"
            inputProps={getInputProps(fields.fullname, {type: 'text'})}
            labelProps={{children: t('contact.fullNameLabel')}}
            errors={fields.fullname.errors}
          />

          <Field
            className="flex-1"
            inputProps={getInputProps(fields.fullname, {type: 'email'})}
            labelProps={{children: t('contact.emailLabel')}}
            errors={fields.email.errors}
          />
        </div>

        <TextareaField
          labelProps={{children: t('contact.messageLabel')}}
          textareaProps={getTextareaProps(fields.message)}
          errors={fields.message.errors}
        />
        {/* <Input
          name="fullname"
          placeholder={t('contact.fullNamePlaceholder') || ''}
          label={t('contact.fullNameLabel') || ''}
          className=" h-14 w-full md:w-[calc(50%-1rem)]"
          required
        />
        <Input
          type="email"
          name="email"
          placeholder={t('contact.emailPlaceholder') || ''}
          label={t('contact.emailLabel') || ''}
          className=" h-14 w-full md:w-[calc(50%-1rem)]"
          required
        />
        <Textarea
          name="message"
          placeholder={t('contact.messagePlaceholder') || ''}
          label={t('contact.messageLabel') || ''}
          className="w-full"
          required
        /> */}

        {/* <div className="flex-1"></div> */}
        <Button type="submit" className="self-end">
          {t('contact.sendButton')}
        </Button>
      </Form>
    </Container>
  );
}
