import Title from '../title';
import Container from './container';

export default function FAQ() {
  return (
    <Container className="!h-fit flex-col p-8">
      <Title>FAQ</Title>

      <p>{`Content: Address common questions clients might have about working with you, such as project timelines, pricing, tech stack, and your approach to development.
SEO Tips: Use keywords related to customer queries like "how to hire a JavaScript developer" or "pricing for JavaScript development services."`}</p>
    </Container>
  );
}
