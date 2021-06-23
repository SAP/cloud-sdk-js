export type ConditionallyNullable<
  T,
  NullableT extends boolean = false
> = NullableT extends true ? T | null : T;

export type IsNullable<T> = T extends null ? true : false;
