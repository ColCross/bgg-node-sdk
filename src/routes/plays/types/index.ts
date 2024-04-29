export type ApiResponseAttributesBase = {
  total: string;
  page: string;
  termsofuse: string;
};

export type ApiResponseBase<T, Q> = {
  plays: {
    _attributes: T;
    play: Q | Array<Q>;
  };
};
