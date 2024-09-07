/* eslint-disable @typescript-eslint/no-explicit-any */
import {useTranslation} from 'react-i18next';

import Title from '../title.tsx';
import Container from './container.tsx';
import {ArticleCard} from '../article-card.tsx';

type BlogSectionProps = {posts: any[]};

export default function BlogSection({posts}: BlogSectionProps) {
  const {t} = useTranslation();
  // const loaderData = useLoaderData<typeof loader>();

  // console.log(loaderData);

  return (
    <Container className="!h-fit flex-col p-8">
      <Title>{t('blog.title')}</Title>

      <div className="flex flex-wrap justify-center gap-8 md:justify-start">
        {posts.map(post => (
          <ArticleCard key={post.slug} article={post} />
        ))}
      </div>
    </Container>
  );
}
