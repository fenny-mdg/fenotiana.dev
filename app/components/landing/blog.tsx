/* eslint-disable @typescript-eslint/no-explicit-any */
import {useTranslation} from 'react-i18next';

import Title from '../title.tsx';
import Container from './container.tsx';
import {ArticleCard} from '../article-card.tsx';
import {Link} from '@remix-run/react';

type BlogSectionProps = {posts: any[]};

export default function BlogSection({posts}: BlogSectionProps) {
  const {t} = useTranslation();

  return (
    <Container className="!h-fit flex-col p-8">
      <Title>{t('blog.title')}</Title>

      <div className="flex flex-wrap justify-center gap-8 md:justify-start">
        {posts.map(post => (
          <div key={post.slug} className="lg:w-[30%]">
            <ArticleCard article={post} />
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
