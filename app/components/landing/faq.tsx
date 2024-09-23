import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Title from '../title';
import Container from './container';
import {useTranslation} from 'react-i18next';

const faqs = Array.from({length: 10}).map((_, i) => ({
  question: `question_${i + 1}`,
  answer: `answer_${i + 1}`,
}));

export default function FAQ() {
  const {t} = useTranslation();
  return (
    <Container className="!h-fit flex-col p-8">
      <Title>FAQ</Title>

      <Accordion type="multiple">
        {faqs.map(({question, answer}) => (
          <AccordionItem key={question} value={question}>
            <AccordionTrigger className="text-lg text-start lg:text-xl ">
              {t(`faq.${question}`)}
            </AccordionTrigger>
            <AccordionContent className="text-sm lg:text-base">
              {t(`faq.${answer}`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
}
