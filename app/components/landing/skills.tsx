import Title from '../title';
import Container from './container';
import {Universe} from '@/components/ui/universe';
import {SkillCard} from '@/components/ui/skill-card';
import {
  backendSkills,
  cloudSkills,
  frontendSkills,
  testingSkills,
  versionControlSkills,
} from '~/utils/skill';

export default function Skills() {
  return (
    <Container className="!h-fit flex-col p-8 gap-8">
      <Title>Skills</Title>

      <SkillCard
        title="Front-End Development"
        skills={frontendSkills}
        leftPanel={
          <Universe
            variant="rounded-rectangle"
            itemsPerOrbit={2}
            items={[
              'react.svg',
              'typescript.svg',
              'tailwind.svg',
              'angular.svg',
              'remix.svg',
              'figma.svg',
            ].map(imageName => (
              <img
                key={imageName}
                src={`/images/${imageName}`}
                alt={imageName}
              />
            ))}
          >
            <img src={`/images/javascript.svg`} alt="JS" />
          </Universe>
        }
      />

      <SkillCard
        title="Back-End Development"
        skills={backendSkills}
        leftPanel={
          <Universe
            variant="rounded-rectangle"
            itemsPerOrbit={2}
            items={[
              'express.svg',
              'fastify.svg',
              'database.svg',
              'rest-api.svg',
              'graphql.svg',
            ].map(imageName => (
              <img
                key={imageName}
                src={`/images/${imageName}`}
                alt={imageName}
              />
            ))}
          >
            <img src={`/images/nodejs.svg`} alt="node" />
          </Universe>
        }
      />

      <SkillCard
        title="Cloud and DevOps"
        skills={cloudSkills}
        leftPanel={
          <Universe
            variant="rounded-rectangle"
            itemsPerOrbit={2}
            items={['aws.svg', 'terraform.svg', 'githubactions.svg'].map(
              imageName => (
                <img
                  key={imageName}
                  src={`/images/${imageName}`}
                  alt={imageName}
                />
              ),
            )}
          >
            <img src={`/images/cloud.svg`} alt="cloud" />
          </Universe>
        }
      />

      <SkillCard
        title="Testing and Optimization "
        skills={testingSkills}
        leftPanel={
          <Universe
            variant="rounded-rectangle"
            itemsPerOrbit={2}
            items={['vitest.svg', 'testing-library.svg', 'cypress.svg'].map(
              imageName => (
                <img
                  key={imageName}
                  src={`/images/${imageName}`}
                  alt={imageName}
                  className="size-12"
                />
              ),
            )}
          >
            <img src={`/images/testing.svg`} alt="testing" />
          </Universe>
        }
      />

      <SkillCard
        title="Version Control & Collaboration "
        skills={versionControlSkills}
        leftPanel={
          <Universe
            variant="rounded-rectangle"
            itemsPerOrbit={2}
            items={[
              'github.svg',
              'gitlab.svg',
              'jira.svg',
              'confluence.svg',
            ].map(imageName => (
              <img
                key={imageName}
                src={`/images/${imageName}`}
                alt={imageName}
              />
            ))}
          >
            <img src={`/images/teamwork.svg`} alt="teamwork" />
          </Universe>
        }
      />
    </Container>
  );
}
