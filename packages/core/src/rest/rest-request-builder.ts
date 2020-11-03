import { Destination, DestinationNameAndJwt } from '../scp-cf';
import { buildAxiosRequestConfig } from '../http-client';

type FunctionType<
  ApiT extends ConstrutorType,
  FnT extends keyof InstanceType<ApiT>
> = InstanceType<ApiT>[FnT];

type ConstrutorType = new (...args: any[]) => any;

export class RestRequestBuilder<
  ApiT extends ConstrutorType,
  FnT extends keyof InstanceType<ApiT>
> {
  private customHeaders: Record<string, string> = {};
  private args: any[];
  constructor(private api: ApiT, private fn: FnT, ...args: any[]) {
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
  ): Promise<ReturnType<FunctionType<ApiT, FnT>>> {
    const requestConfig = await buildAxiosRequestConfig(destination, {
      headers: this.customHeaders
    });

    const apiInstance = new this.api(requestConfig);
    return apiInstance[this.fn](...this.args);
  }
}
