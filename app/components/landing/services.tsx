import Title from '../title';
import Container from './container';

export default function Services() {
  return (
    <Container className="!h-fit flex-col p-8">
      <Title>Services</Title>

      <p>
        {`Content: Detail the specific services you offer, such as custom web
        applications, front-end development (React, Angular), back-end
        development (Node.js, Express, Fastify), and consulting. SEO Tips: Use
        keywords related to your services, like "Web Development in React,"
        "Full-Stack Development with Express," or "Consulting Services in
        JavaScript."`}
      </p>
    </Container>
  );
}
