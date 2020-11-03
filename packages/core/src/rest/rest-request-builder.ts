import { Destination, DestinationNameAndJwt } from '../scp-cf';
import { buildAxiosRequestConfig } from '../http-client';

type FunctionReturnType<ApiT, FnT extends keyof ApiT> = ApiT[FnT] extends (
  ...args: any
) => any
  ? UnPromisify<ReturnType<ApiT[FnT]>>
  : never;
type UnPromisify<T> = T extends Promise<infer U> ? U : T;
type ConstructorType<T> = new (...args: any[]) => T;

export class RestRequestBuilder<ApiT> {
  private customHeaders: Record<string, string> = {};
  private args: any[];
  constructor(
    private apiConstructor: ConstructorType<ApiT>,
    private fn: keyof ApiT,
    ...args: any[]
  ) {
    this.args = args;
  }

  withCustomHeaders(headers: Record<string, string>): this {
    Object.entries(headers).forEach(([key, value]) => {
      this.customHeaders[key.toLowerCase()] = value;
    });
    return this;
  }

  async execute(
    destination: Destination | DestinationNameAndJwt
  ): Promise<FunctionReturnType<ApiT, keyof ApiT>> {
    const requestConfig = await buildAxiosRequestConfig(destination, {
      headers: this.customHeaders
    });

    const api = new this.apiConstructor(requestConfig);
    const fn = api[this.fn];

    if (typeof fn === 'function') {
      return fn.apply(api, this.args);
    }

    throw new Error(
      `'${this.fn}' is not a function of ${this.apiConstructor.name}`
    );
  }
}
