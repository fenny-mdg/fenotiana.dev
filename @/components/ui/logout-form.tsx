import {forwardRef} from 'react';

type LogoutFormProps = {
  children: React.ReactNode;
  logoutRoute: string;
  formId: string;
};

const LogoutForm = forwardRef<HTMLFormElement, LogoutFormProps>(
  ({logoutRoute, formId}, ref) => (
    <form ref={ref} method="post" action={logoutRoute} id={formId} />
  ),
);

LogoutForm.displayName = 'LogoutForm';

export default LogoutForm;
