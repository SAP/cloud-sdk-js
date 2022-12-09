import CircuitBreaker from 'opossum';
// eslint-disable-next-line import/named
import { AxiosError, AxiosResponse } from 'axios';
import {
  Context,
  HttpMiddlewareContext,
  Middleware,
  MiddlewareIn
} from './middleware';

type ErrorFilter = (err) => boolean;
type KeyBuilder<ContextT extends Context> = (context: ContextT) => string;

function httpErrorFilter(error: AxiosError): boolean {
  if (
    error.response?.status &&
    [401, 403, 404].includes(error.response.status)
  ) {
    return true;
  }
  return false;
}

function httpKeyBuilder(context: HttpMiddlewareContext): string {
  return `${context.uri}::${context.requestConfig.url}::${context.tenantId}`;
}

function xsuaaKeyBuilder(context: Context): string {
  return `${context.uri}::${context.tenantId}`;
}

/**
 *  @internal
 */
export function circuitbreakerHttp(): Middleware<
  AxiosResponse,
  HttpMiddlewareContext
> {
  return circuitbreaker(httpKeyBuilder, httpErrorFilter);
}

/**
 * @internal
 */
export function circuitbreakerXSUAA<ContextT extends Context>(): Middleware<
  AxiosResponse,
  ContextT
> {
  return circuitbreaker<AxiosResponse, ContextT>(xsuaaKeyBuilder, () => false);
}

function circuitbreaker<ReturnT, ContextT extends Context>(
  keyBuilder: KeyBuilder<ContextT>,
  errorFilter: ErrorFilter
): Middleware<ReturnT, ContextT> {
  return (options: MiddlewareIn<any, any>) => () =>
    (
      getCircuitBreaker(
        keyBuilder(options.context),
        errorFilter
      ) as CircuitBreaker<any, ReturnT>
    ).fire(options.fn);
}

/**
 * Map of all existing circuit breakers.
 * Entries are added in a lazy way.
 */
export const circuitBreakers: Record<string, CircuitBreaker> = {};

function getCircuitBreaker(
  key: string,
  errorFilter: ErrorFilter
): CircuitBreaker {
  if (!circuitBreakers[key]) {
    circuitBreakers[key] = new CircuitBreaker(executeFunction, {
      ...circuitBreakerDefaultOptions,
      errorFilter
    });
  }
  return circuitBreakers[key];
}

function executeFunction<T extends (...args: any[]) => any>(
  fn: T,
  ...parameters: Parameters<T>
): ReturnType<T> {
  return fn(...parameters);
}

/**
 * @internal
 */
export const circuitBreakerDefaultOptions: CircuitBreakerOptions = {
  timeout: false,
  errorThresholdPercentage: 50,
  volumeThreshold: 10,
  resetTimeout: 30000,
  cache: false
};

/**
 * This is partially copied from CircuitBreaker.Options of `@types/opossum`.
 * @internal
 */
export interface CircuitBreakerOptions {
  /**
   * @internal
   */
  timeout?: number | false | undefined;
  /**
   * @internal
   */
  errorThresholdPercentage?: number | undefined;
  /**
   * @internal
   */
  volumeThreshold?: number | undefined;
  /**
   * @internal
   */
  resetTimeout?: number | undefined;
  /**
   * @internal
   */
  cache?: boolean | undefined;
}
