import {Link} from '@remix-run/react';
import {clsx} from 'clsx';
// import { getImageBuilder, getImgProps } from "~/images.tsx";
import {type MdxListItem, type Team} from '~/utils/types.ts';
// import {getBannerAltProp, getBannerTitleProp} from '~/utils/mdx.tsx';
// import { useRootData } from "~/utils/use-root-data.ts";
// import { BlurrableImage } from "./blurrable-image.tsx";
// import { ClipboardCopyButton } from "./clipboard-copy-button.tsx";
// import { MissingSomething } from "./kifs.tsx";
import {H3} from './typography.tsx';

function ArticleCard({
  leadingTeam,
  article: {
    readTime,
    dateDisplay,
    slug,
    frontmatter,
    frontmatter: {title = 'Untitled Post', bannerBlurDataUrl},
  },
}: {
  article: MdxListItem;
  leadingTeam?: Team | null;
}) {
  // const { requestInfo } = useRootData();
  // const permalink = `${requestInfo.origin}/blog/${slug}`;

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
        {/* {bannerCloudinaryId ? (
          <BlurrableImage
            key={bannerCloudinaryId}
            blurDataUrl={bannerBlurDataUrl}
            className="aspect-[3/4] rounded-lg"
            img={
              <img
                title={frontmatter.title ?? getBannerTitleProp(frontmatter)}
                {...getImgProps(
                  getImageBuilder(
                    bannerCloudinaryId,
                    getBannerAltProp(frontmatter)
                  ),
                  {
                    widths: [280, 560, 840, 1100, 1300, 1650],
                    sizes: [
                      "(max-width:639px) 80vw",
                      "(min-width:640px) and (max-width:1023px) 40vw",
                      "(min-width:1024px) and (max-width:1620px) 25vw",
                      "420px",
                    ],
                    transformations: {
                      background: "rgb:e6e9ee",
                      resize: {
                        type: "fill",
                        aspectRatio: "3:4",
                      },
                    },
                  }
                )}
                className="focus-ring w-full rounded-lg object-cover object-center transition"
                loading="lazy"
              />
            }
          /> */}
        <div className="aspect-[3/4]">
          <div className="focus-ring w-full rounded-lg transition">
            Something Missing
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

      {leadingTeam ? (
        <div className="bg-team-current absolute right-6 top-6 z-10 h-4 w-4 rounded-full p-1 lg:left-6" />
      ) : null}
      {/* <ClipboardCopyButton
        value={permalink}
        className="absolute left-6 top-6 z-10"
      /> */}
    </div>
  );
}

export {ArticleCard};
