/* eslint-disable @typescript-eslint/no-explicit-any */
type ProjectCardProps = {
  title: string;
  description: string;
  preview?: string;
  link?: string;
};

export default function ProjectCard({
  title,
  description,
  preview = '',
  link = '',
}: ProjectCardProps) {
  const Wrapper = ({children, ...rest}: any) =>
    link ? (
      <a {...rest} href={link} target="blank">
        {children}
      </a>
    ) : (
      <section {...rest}>{children}</section>
    );

  return (
    <Wrapper className="group relative max-w-[20rem] rounded-lg bg-inherit shadow-lg dark:border dark:border-slate-700/50">
      {preview ? <img
          src={preview}
          alt="preview"
          className="max-h-52 w-full rounded-t-lg object-cover"
        /> : null}
      <span className=" flex flex-col gap-4 p-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-xs font-light">{description}</p>
      </span>
      <div className="absolute top-0 z-10 h-full w-full rounded-lg bg-gradient-to-b from-transparent to-gray-900 opacity-0 transition-opacity duration-75 group-hover:opacity-50  dark:group-hover:opacity-75"></div>
    </Wrapper>
  );
}

ProjectCard.defaultProps = {
  link: '',
};
