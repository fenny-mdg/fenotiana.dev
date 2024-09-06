import clsx from "clsx";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <section
      className={clsx(
        "flex h-screen  bg-white dark:bg-slate-800 lg:h-full lg:rounded-lg",
        "lg:mt-8 first:lg:mt-0",
        "lg:shadow-lg",
        className
      )}
    >
      {children}
    </section>
  );
}
