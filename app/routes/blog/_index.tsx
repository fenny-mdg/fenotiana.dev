import {
  json,
  type HeadersFunction,
  type LinksFunction,
  LoaderFunctionArgs,
} from '@remix-run/node';
import {useLoaderData, useSearchParams} from '@remix-run/react';
import * as React from 'react';
import {ArticleCard} from '~/components/article-card';
import {Grid} from '~/components/grid';
import {H3} from '~/components/typography.tsx';
import {type KCDHandle, type Team} from '~/utils/types';
import {getBlogMdxListItems} from '~/utils/mdx.server.ts';
import {
  isTeam,
  reuseUsefulLoaderHeaders,
  useUpdateQueryStringValueWithoutNavigation,
} from '~/utils/misc.tsx';
import {getServerTimeHeader} from '~/utils/timing.server.ts';

const handleId = 'blog';
export const handle: KCDHandle = {
  id: handleId,
  getSitemapEntries: () => [{route: `/blog`, priority: 0.7}],
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: 'Kent C. Dodds Blog',
      href: '/blog/rss.xml',
    },
  ];
};

export async function loader({request}: LoaderFunctionArgs) {
  const timings = {};
  const [posts] = await Promise.all([
    getBlogMdxListItems({request}).then(allPosts =>
      allPosts.filter(p => !p.frontmatter.draft),
    ),
  ]);

  const tags = new Set<string>();
  for (const post of posts) {
    for (const category of post.frontmatter.categories ?? []) {
      tags.add(category);
    }
  }

  const data = {
    posts,
    tags: Array.from(tags),
  };

  return json(data, {
    headers: {
      'Cache-Control': 'private, max-age=3600',
      Vary: 'Cookie',
      'Server-Timing': getServerTimeHeader(timings),
    },
  });
}

export const headers: HeadersFunction = reuseUsefulLoaderHeaders;

// should be divisible by 3 and 2 (large screen, and medium screen).
const PAGE_SIZE = 12;
const initialIndexToShow = PAGE_SIZE;

const specialQueryRegex = /(?<not>!)?leader:(?<team>\w+)(\s|$)?/g;

function BlogHome() {
  const [searchParams] = useSearchParams();
  const [userReadsState] = React.useState<'read' | 'unread' | 'unset'>('unset');

  const resultsRef = React.useRef<HTMLDivElement>(null);
  /**
   * This is here to make sure that a user doesn't hit "enter" on the search
   * button, which focuses the input and then keyup the enter on the input
   * which will trigger the scroll down. We should *only* scroll when the
   * "enter" keypress and keyup happen on the input.
   */
  const [queryValue] = React.useState<string>(() => {
    return searchParams.get('q') ?? '';
  });
  const query = queryValue.trim();

  useUpdateQueryStringValueWithoutNavigation('q', query);

  const data = useLoaderData<typeof loader>();
  const {posts: allPosts} = data;

  const matchingPosts = React.useMemo(() => {
    const r = new RegExp(specialQueryRegex);
    let match = r.exec(query);
    const leaders: Array<Team> = [];
    const nonLeaders: Array<Team> = [];
    while (match) {
      const {team, not} = match.groups ?? {};
      const upperTeam = team?.toUpperCase();
      if (isTeam(upperTeam)) {
        if (not) {
          nonLeaders.push(upperTeam);
        } else {
          leaders.push(upperTeam);
        }
      }
      match = r.exec(query);
    }

    const filteredPosts = allPosts;

    return filteredPosts;
  }, [allPosts, query]);

  const [indexToShow, setIndexToShow] = React.useState(initialIndexToShow);
  // when the query changes, we want to reset the index
  React.useEffect(() => {
    setIndexToShow(initialIndexToShow);
  }, [query]);

  const isSearching = query.length > 0 || userReadsState !== 'unset';

  const posts = isSearching
    ? matchingPosts.slice(0, indexToShow)
    : matchingPosts
        // .filter((p) => p.slug !== data.recommended?.slug)
        .slice(0, indexToShow);

  return (
    <div>
      <Grid className="mb-64" ref={resultsRef}>
        {posts.length === 0 ? (
          <div className="col-span-full flex flex-col items-center">
            {/* <img
              {...getImgProps(images.bustedOnewheel, {
                className: "mt-24 h-auto w-full max-w-lg",
                widths: [350, 512, 1024, 1536],
                sizes: ["(max-width: 639px) 80vw", "512px"],
              })}
            /> */}
            <H3 as="p" variant="secondary" className="mt-24 max-w-lg">
              {`Couldn't find anything to match your criteria. Sorry.`}
            </H3>
          </div>
        ) : (
          posts.map(article => (
            <div key={article.slug} className="col-span-4 mb-10">
              <ArticleCard
                article={article}
                // leadingTeam={getLeadingTeamForSlug(article.slug)}
              />
            </div>
          ))
        )}
      </Grid>
    </div>
  );
}

export default BlogHome;
// export function ErrorBoundary() {
//   // const error = useCapturedRouteError();
//   // console.error(error);
//   return <ServerError />;
// }

/*
eslint
  complexity: "off",
*/
