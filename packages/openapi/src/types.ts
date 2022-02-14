import { AxiosResponse } from 'axios';

/**
 * Type of the parameters of a given function
 * @typeparam ApiT - Interface of the API.
 * @typeparam FnT - Name of the function, that is part of the API.
 * @internal
 */
export type ParametersType<ApiT, FnT extends keyof ApiT> = ApiT[FnT] extends (
  ...args: any
) => any
  ? Parameters<ApiT[FnT]>
  : never;

/**
 * Unwrap return type of the given function type `ApiT[FnT]`.
 * E. g. for `someFunction() => AxiosResponse<SomeReturnType>` this gives you `SomeReturnType`.
 * It is `never` when the given type is not a function type
 * @typeparam ApiT - Interface of the API.
 * @typeparam FnT - Name of the function, that is part of the API.
 * @internal
 */
export type FunctionReturnType<
  ApiT,
  FnT extends keyof ApiT
> = ApiT[FnT] extends (...args: any) => any
  ? UnPromisify<ReturnType<ApiT[FnT]>>
  : never;

/**
 * Unwrap the Axios response type.
 * @internal
 */
export type UnwrapAxiosResponse<T> = T extends AxiosResponse<infer U> ? U : T;

/**
 * Get the type of the promised response, e. g. for `Promise<SomeType>` this gives you `SomeType`.
 * @typeparam T - Type of the promised content.
 * @internal
 */
export type UnPromisify<T> = T extends Promise<infer U> ? U : T;

/**
 * The type of a constructor.
 * @typeparam T - Type of an instance created by the constructor.
 * @internal
 */
export type ConstructorType<T> = new (...args: any[]) => T;
