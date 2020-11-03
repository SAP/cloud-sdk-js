import { RestRequestBuilder } from './rest-request-builder';

export type ParametersType<
  ApiT,
  FunctionT extends keyof ApiT
> = ApiT[FunctionT] extends (...args: any) => any
  ? Parameters<ApiT[FunctionT]>
  : never;

export type ApiRequestBuilder<ApiT> = {
  [FunctionT in keyof ApiT]?: (
    ...args: ParametersType<ApiT, FunctionT>
  ) => RestRequestBuilder<ApiT>;
};
