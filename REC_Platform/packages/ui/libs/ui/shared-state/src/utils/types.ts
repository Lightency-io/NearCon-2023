export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export type AllFetchOptions<T> = {
  url: string;
  fetchFunc: () => Promise<T>;
};

export type OriginResponse<T> = Omit<Response, 'json'> & {
  json: () => Promise<T>;
};
