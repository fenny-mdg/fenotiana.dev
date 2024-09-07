import type {ReactNode} from 'react';

type Stack = {
  image: ReactNode;
  href: string;
};

export type StackProps = {
  title: string;
  stacks: Array<Stack>;
};

export default function StackListing({title, stacks}: StackProps) {
  return (
    <div className="mt-16 flex flex-col items-center gap-8 text-center md:mt-20">
      <h3 className="text-xl font-medium">{title}</h3>

      <div className="flex flex-wrap justify-center gap-8">
        {stacks.map(({href, image}) => (
          <a key={href} href={href} target="blank">
            {image}
            {/* <AngularIcon /> */}
            {/* <img src={image} alt="stack" className="w-16 md:w-20" /> */}
          </a>
        ))}
      </div>
    </div>
  );
}
