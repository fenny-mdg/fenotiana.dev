import {Link} from '@remix-run/react';
import {clsx} from 'clsx';

import {type MdxListItem, type Team} from '~/utils/types.ts';
import {H3} from './typography.tsx';

function ArticleCard({
  leadingTeam,
  article: {
    readTime,
    dateDisplay,
    slug,
    frontmatter: {title = 'Untitled Post', bannerImageUrl},
  },
}: {
  article: MdxListItem;
  leadingTeam?: Team | null;
}) {
  return (
    <div
      className={clsx(
        'relative w-full',
        leadingTeam
          ? `set-color-team-current-${leadingTeam.toLowerCase()}`
          : null,
      )}
    >
      <Link
        prefetch="intent"
        className="group peer relative block w-full focus:outline-none"
        to={`/blog/${slug}`}
      >
        <div>
          <div className="focus-ring w-full rounded-lg transition">
            <img alt={slug} src={bannerImageUrl} className="rounded-lg" />
          </div>
        </div>
        <div className="mt-8 text-xl font-medium text-gray-500">
          {[dateDisplay, readTime?.text ?? 'quick read']
            .filter(Boolean)
            .join(' — ')}
        </div>
        <H3 as="div" className="mt-4">
          {title}
        </H3>
      </Link>
    </div>
  );
}

export {ArticleCard};
