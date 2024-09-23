import {cn} from '@/lib/utils';
import {ReactNode} from 'react';
import {chunkArray} from '~/utils/array';

type UniverseProps = {
  itemsPerOrbit?: number;
  variant?: 'circle' | 'rounded-rectangle';
  items: ReactNode[];
  children?: ReactNode;
};

const indexPostionMapper = ['left', 'right', 'top', 'bottom'];

export const Universe = ({
  items,
  variant = 'circle',
  itemsPerOrbit = 1,
  children,
}: UniverseProps) => {
  const orbits = chunkArray<ReactNode>(items, itemsPerOrbit);

  return (
    <div className="relative flex items-center justify-center h-screen">
      <div className="size-12  rounded-full">{children}</div>

      {orbits.map((orbit, index) => (
        <>
          <div
            key={Math.random()}
            className={cn(
              'absolute rounded-full',
              `orbit-${index}`,
              variant,
              variant !== 'circle'
                ? 'border border-dashed border-gray-400'
                : '',
            )}
          >
            {variant === 'circle' ? (
              <div
                className={cn(
                  'absolute rounded-full border border-dashed border-gray-400',
                  `orbit-${index}`,
                  variant,
                  '!animate-none',
                )}
              />
            ) : null}
            {orbit.map((item, idx) => (
              <div
                key={Math.random()}
                className={cn(
                  'absolute inset-0 flex items-center ',
                  `orbit-item-container-${indexPostionMapper[idx]}`,
                )}
              >
                <div
                  className={cn(
                    'w-12 h-12  rounded-full',
                    `orbit-item-${indexPostionMapper[idx]}`,
                  )}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
