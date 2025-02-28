import CircuitBreaker from 'opossum';
// eslint-disable-next-line import/named
import type { AxiosError } from 'axios';
import type {
  MiddlewareContext,
  Middleware,
  MiddlewareOptions
} from './middleware';

/**
 * Map of all existing circuit breakers.
 * Entries are added in a lazy way.
 * TODO:
 *  The value type here should be CircuitBreaker, but this would make the Opossum types part of our public API.
 *  This happens although it is marked as internal, because transpilation includes internal.
 *  Adding CircuitBreaker will break transpilation on generation.
 * @internal
 */
export const circuitBreakers: Record<string, any> = {};

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
type KeyBuilder<ArgumentT, ContextT extends MiddlewareContext<ArgumentT>> = (
  context: ContextT
) => string;

function httpErrorFilter(error: AxiosError): boolean {
  return (
    !!error.response?.status && error.response.status.toString().startsWith('4')
  );
}

function circuitBreakerKeyBuilder<
  ArgumentT,
  ContextT extends MiddlewareContext<ArgumentT>
>({ uri, tenantId = 'tenant_id' }: ContextT): string {
  return `${uri}::${tenantId}`;
}

/**
 * Helper method to build a circuit breaker middleware.
 * @returns The middleware adding a circuit breaker to the function.
 */
export function circuitBreaker<
  ArgumentT,
  ReturnT,
  ContextT extends MiddlewareContext<ArgumentT>
>(): Middleware<ArgumentT, ReturnT, ContextT> {
  return circuitBreakerGeneric<ArgumentT, ReturnT, ContextT>(
    circuitBreakerKeyBuilder,
    httpErrorFilter
  );
}

function circuitBreakerGeneric<
  ArgumentT,
  ReturnT,
  ContextT extends MiddlewareContext<ArgumentT>
>(
  keyBuilder: KeyBuilder<ArgumentT, ContextT>,
  errorFilter: ErrorFilter
): Middleware<ArgumentT, ReturnT, ContextT> {
  return (options: MiddlewareOptions<any, any, any>) => fnArgument =>
    (
      getCircuitBreaker(
        keyBuilder(options.context),
        errorFilter
      ) as CircuitBreaker<any, ReturnT>
    ).fire(options.fn, fnArgument);
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
