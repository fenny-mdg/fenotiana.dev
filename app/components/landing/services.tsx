import {Button} from '@/components/ui/button';
import Title from '../title';
import Container from './container';

const services = [
  {
    title: 'Custom Web Application Development',
    description: `I create fully customized web applications tailored to your specific needs. Whether for a startup or an established company, I design and develop solutions that perfectly align with your business requirements.
What I offer:

Development of modern, high-performance web applications using React, Remix, or Angular.
Integration of intuitive user interfaces with Tailwind CSS or custom frameworks.
Performance optimization and security enhancements for applications.
Creation of robust back-end APIs with Node.js and management of databases such as MongoDB, MySQL, or PostgreSQL.
I ensure that each application is scalable, easy to maintain, and optimized for high-level performance, regardless of your business size.`,
    imageUrl:
      'https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Cloud Solutions & CI/CD Implementation',
    description: `Optimize your infrastructure and deployment processes with custom cloud solutions. I support your business in transitioning to the cloud and automating processes through CI/CD pipelines.
What I offer:

Deployment and management of applications on cloud environments like AWS (EC2, Lambda, S3, etc.).
Infrastructure automation with Terraform for efficient and scalable cloud resource management.
Implementation of CI/CD (Continuous Integration / Continuous Deployment) pipelines with GitHub Actions or GitLab CI/CD for automated and fast updates.
Monitoring and performance optimization of your cloud applications.
My goal is to help you adopt flexible cloud infrastructures and DevOps processes that enhance deployment efficiency while reducing operational costs.`,
    imageUrl:
      'https://images.unsplash.com/photo-1667984390527-850f63192709?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function Services() {
  return (
    <Container className="!h-fit flex-col p-8">
      <Title>Services</Title>

      <div className="space-y-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 bg-primary rounded-lg shadow-md transform transition-transform duration-300 flex flex-col gap-4 hover:shadow-lg hover:cursor-pointer"
          >
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-2xl font-bold ">{service.title}</h2>
            <p className=" whitespace-pre-line line-clamp-3">
              {service.description}
            </p>
            <Button variant="secondary" className="self-start">
              Read More
            </Button>
          </div>
        ))}
      </div>
    </Container>
  );
}
