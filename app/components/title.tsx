type TitleProps = {
  children: string;
};

export default function Title({ children }: TitleProps) {
  return (
    <div className="mb-16">
      <h3 className=" text-3xl font-medium uppercase">{children}</h3>
      <hr className="h-2 w-10 rounded-full border-0 bg-gradient-to-r from-violet-500 via-pink-500  to-rose-600" />
    </div>
  );
}
