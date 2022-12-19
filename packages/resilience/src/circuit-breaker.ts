import CircuitBreaker from 'opossum';
// eslint-disable-next-line import/named
import { AxiosError } from 'axios';
import { Context, Middleware, MiddlewareIn } from './middleware';

/**
 * Map of all existing circuit breakers.
 * Entries are added in a lazy way.
 * @internal
 */
export const circuitBreakers: Record<string, CircuitBreaker> = {};

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
type ErrorFilter = (err) => boolean;
type KeyBuilder<ContextT extends Context> = (context: ContextT) => string;

function httpErrorFilter(error: AxiosError): boolean {
  if (
    error.response?.status &&
    error.response.status.toString().startsWith('4')
  ) {
    return true;
  }
  return false;
}

function circuitBreakerKeyBuilder<ContextT extends Context>(
  context: ContextT
): string {
  return `${context.uri}::${context.tenantId}`;
}

/**
 * @internal
 */
export function circuitBreakerHttp<
  ReturnT,
  ContextT extends Context
>(): Middleware<ReturnT, ContextT> {
  return circuitBreaker<ReturnT, ContextT>(
    circuitBreakerKeyBuilder,
    httpErrorFilter
  );
}

function circuitBreaker<ReturnT, ContextT extends Context>(
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
