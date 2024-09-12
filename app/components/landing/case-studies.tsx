import {MdxListItem} from '~/types';
import Title from '../title';
import Container from './container';
import {Link} from '@remix-run/react';
import {useTranslation} from 'react-i18next';
import {ProjectCard} from '@/components/ui/project-card';

export default function CaseStudies({projects}: {projects: MdxListItem[]}) {
  const {t} = useTranslation();
  return (
    <Container className="!h-fit flex-col p-8">
      <Title>Case Studies</Title>

      <div className="flex flex-wrap justify-center gap-8 md:justify-start">
        {projects.map(project => (
          <div key={project.slug} className="lg:w-[30%]">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link to="/blog" className="btn">
          {t('blog.viewAll')}
        </Link>
      </div>
    </Container>
  );
}
