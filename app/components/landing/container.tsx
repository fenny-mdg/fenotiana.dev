import clsx from 'clsx';

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Container({children, className}: ContainerProps) {
  return (
    <section
      className={clsx(
        'flex h-screen  bg-background lg:h-full lg:rounded-lg',
        'lg:shadow-lg',
        className,
      )}
    >
      {children}
    </section>
  );
}
