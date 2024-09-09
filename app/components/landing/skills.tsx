import Title from '../title';
import Container from './container';

export default function Skills() {
  return (
    <Container className="!h-fit flex-col p-8">
      <Title>Skills</Title>

      <p>{`Content: Create a detailed list of your skills. Mention frameworks, libraries, languages, and tools (e.g., JavaScript, React, Node.js, Fastify, GitHub Actions, AWS, Terraform).
SEO Tips: Include specific technical skills and tools, e.g., "Proficient in Tailwind CSS," "Experience with Remix and GitLab CI/CD."`}</p>
    </Container>
  );
}
