import {
  CircuitBreakerOptions,
  defaultCircuitBreakerOptions
} from './circuit-breaker-options';

/**
 * Options to configure resilience when fetching destinations.
 * @deprecated
 */
export interface ResilienceOptions {
  /**
   * A boolean value that indicates whether to execute request to SCP-CF services using circuit breaker.
   * ResilienceOptions.
   * @deprecated
   */
  enableCircuitBreaker?: boolean;

  /**
   * Timeout in milliseconds to retrieve the destination.
   * @deprecated
   */
  timeout?: number;
}

/**
 * TODO: Add JSDoc later.
 */
export type TimeoutOptions = false | number;

/**
 * Options to configure resilience when fetching destinations.
 */
export interface ResilienceMiddlewareOptions {
  id: string;
  /**
   * Timeout in milliseconds to retrieve the destination.
   */
  timeout: () => TimeoutOptions;
  circuitBreaker: () => CircuitBreakerOptions;
}

/**
 * TODO: Add JSDoc later.
 */
export const defaultResilienceOptions: Required<
  Omit<ResilienceMiddlewareOptions, 'id'>
> = {
  timeout: () => 10000,
  circuitBreaker: () => defaultCircuitBreakerOptions
};

/**
 * Type of the request handler that needs to be wrapped with resilience.
 */
export type RequestHandler<T> = (...args: any[]) => Promise<T>;

/**
 * TODO: Add JSDoc later.
 */
export interface MiddlewareInOutOptions<T> {
  fn: RequestHandler<T>;
  exitChain?: boolean;
}

/**
 * TODO: Add JSDoc later.
 */
export type Middleware<T> = (
  options: MiddlewareInOutOptions<T>
) => MiddlewareInOutOptions<T>;
