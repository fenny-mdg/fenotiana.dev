import {cn} from '@/lib/utils';
import {Link} from '@remix-run/react';
import {H3} from '~/components/typography';
import {MdxListItem} from '~/types';

type ProjectCardProps = {
  project: MdxListItem;
};

export const ProjectCard = ({
  project: {
    slug,
    frontmatter: {title = 'Untitled Post', bannerImageUrl, description},
  },
}: ProjectCardProps) => {
  return (
    <div className={cn('relative w-full')}>
      <Link
        prefetch="intent"
        className={cn(
          'group peer relative block w-full focus:outline-none rounded-2xl',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
        )}
        to={`/projects/${slug}`}
      >
        <div className="focus-ring w-full rounded-lg transition">
          <img
            alt={slug}
            src={bannerImageUrl}
            className="rounded-2xl shadow-md"
          />
        </div>

        <div className="p-4 min-h-64 space-y-2">
          <H3 as="div">{title}</H3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
};
