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
      {/* <div className="absolute w-48 h-28 rounded-full border border-dashed border-gray-400 group-hover:animate-orbit-slow">
        <div className="absolute inset-0 flex items-center justify-start">
          <div
            className="w-12 h-12  rounded-full"
            style={{ marginLeft: '-12px' }}
          >
            <img src="/images/react.svg" alt="React" />
          </div>
        </div>


      </div>

      <div className="absolute w-72 h-48 rounded-full border border-dashed border-gray-400 animate-orbit">
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="w-12 h-12 rounded-full" style={{ marginLeft: '-12px' }}>
            <img src="/images/typescript.svg" alt="typescript logo" />
          </div>
        </div>
      </div>

      <div className="absolute w-96 h-72 rounded-full border border-dashed border-gray-400 animate-orbit-fast">
        <div className="absolute inset-0 flex items-center justify-start">
          <div
            className="w-12 h-12 bg-yellow-500 rounded-full"
            style={{ marginLeft: '-18px' }}
          ></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-12 bg-yellow-500 rounded-full"
            style={{ marginTop: '290px' }}
          ></div>
        </div>
      </div> */}
    </div>
  );
};
