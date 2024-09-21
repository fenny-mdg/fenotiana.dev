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
          <div key={index} className="border rounded-lg p-4 shadow-lg">
            <img
              src={cert.preview}
              alt={`${cert.title} preview`}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{cert.title}</h3>
              <p className="text-gray-600">{cert.description}</p>
              <p className="text-gray-500 text-sm mt-2">
                Issued: {cert.issueDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
