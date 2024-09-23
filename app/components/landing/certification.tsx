import {Button} from '@/components/ui/button';
import Title from '../title';
import Container from './container';

export default function Certification() {
  const certificates = [
    {
      title: 'Epic React Workshop - Module 1',
      description:
        'Learn the fundamentals of React, including JSX, props, and state.',
      issueDate: 'January 2023',
      preview: '/path/to/certificate1.png',
    },
    {
      title: 'Epic React Workshop - Module 2',
      description:
        'Dive deeper into React with hooks, context, and advanced patterns.',
      issueDate: 'February 2023',
      preview: '/path/to/certificate2.png',
    },
    {
      title: 'Epic React Workshop - Module 3',
      description: 'Master React performance optimization and testing.',
      issueDate: 'March 2023',
      preview: '/path/to/certificate3.png',
    },
  ];

  return (
    <Container className="!h-fit flex-col p-8">
      <Title>Certification</Title>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="max-w-md mx-auto bg-background rounded-lg shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="bg-primary text-primary-foreground rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 12l-9 4.5v-9L12 3l9 4.5v9L12 12z"
                  />
                </svg>
              </div>

              <div className="text-right">
                <p className="text-primary-foreground text-sm">Issued On:</p>
                <p className="font-semibold text-card-foreground">
                  Sept 21, 2024
                </p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-card-foreground mb-2">
              Certificate of Excellence
            </h2>

            <p className="text-lg font-semibold text-primary-foreground mb-4">
              John Doe
            </p>

            <p className="text-gray-600 mb-4">
              This certificate is proudly awarded for outstanding performance
              and dedication in completing the course Advanced Web Development
              with Tailwind CSS and ShadCN.
            </p>

            <div className="flex justify-end space-x-2">
              <Button>Print</Button>
              <Button variant="link">Download</Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
