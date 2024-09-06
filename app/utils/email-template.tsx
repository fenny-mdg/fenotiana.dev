import {Heading, Text, Tailwind, Link} from '@react-email/components';

type RegisterConfirmationTemplateProps = {
  username: string;
  confirmationLink: string;
};

export const RegisterConfirmationTemplate = ({
  username,
  confirmationLink,
}: RegisterConfirmationTemplateProps) => {
  return (
    <Tailwind>
      <Heading className="text-lg font-medium mb-8">
        Confirmation inscription
      </Heading>
      <Text className="mb-4">Bonjour {username}, </Text>
      <Text>
        Vous avez créé un compte sur SMSmart, pour confirmer la création de
        votre compte, veuillez cliquer sur ce lien{' '}
        <Link href={confirmationLink}>Confirmer mon compte</Link>
      </Text>
    </Tailwind>
  );
};
