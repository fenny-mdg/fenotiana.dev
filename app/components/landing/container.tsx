import clsx from 'clsx';

type ContainerProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
};

export default function Container({children, className, id}: ContainerProps) {
  return (
    <section
      id={id}
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
