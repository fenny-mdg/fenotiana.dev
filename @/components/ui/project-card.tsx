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
        className="group peer relative block w-full focus:outline-none"
        to={`/project/${slug}`}
      >
        <div>
          <div className="focus-ring w-full rounded-lg transition">
            <img alt={slug} src={bannerImageUrl} className="rounded-lg" />
          </div>
        </div>
        {/* <div className="mt-8 text-xl font-medium text-gray-500">
          {[dateDisplay, readTime?.text ?? 'quick read']
            .filter(Boolean)
            .join(' — ')}
        </div> */}
        <H3 as="div" className="mt-4">
          {title}
        </H3>
        <p>{description}</p>
      </Link>
    </div>
  );
};
