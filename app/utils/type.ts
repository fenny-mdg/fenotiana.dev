export type GenericFilter<T> = {
  size?: number;
  page?: number;
  orderBy?: keyof T;
  direction?: 'asc' | 'desc';
};

export type OptionalExceptFor<
  T,
  TRequired extends keyof T = keyof T,
> = Partial<T> & Pick<T, TRequired>;
