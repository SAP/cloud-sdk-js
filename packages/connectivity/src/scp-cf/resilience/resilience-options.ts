import { Method } from '@sap-cloud-sdk/http-client';
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
   */
  enableCircuitBreaker?: boolean;

  /**
   * Timeout in milliseconds to retrieve the destination.
   */
  timeout?: number;
}

/**
 * TODO: Add JSDoc later.
 */
export type TimeoutOptions = false | number;

/**
 * TODO: Add JSDoc later.
 */
export interface RequestContext {
  url?: string;
  headers?: Record<string, string>;
  jwt?: string;
  method?: Method;
}

/**
 * Options to configure resilience when fetching destinations.
 */
export interface ResilienceMiddlewareOptions {
  /**
   * Timeout in milliseconds to retrieve the destination.
   */
  timeout: (context?: RequestContext) => TimeoutOptions;
  circuitBreaker: (context?: RequestContext) => CircuitBreakerOptions;
}

/**
 * TODO: Add JSDoc later.
 */
export const defaultResilienceOptions: Required<ResilienceMiddlewareOptions> = {
  timeout: () => 10000,
  circuitBreaker: enableCircuitBreakerForBTP
};

/**
 * TODO: Add JSDoc later.
 * @param context - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
function enableCircuitBreakerForBTP(
  context: RequestContext
): CircuitBreakerOptions {
  if (context.url && context.url === 'btpDomain') {
    return { ...defaultCircuitBreakerOptions, id: context.url };
  }
  return false;
}

/**
 * Type of the request handler that needs to be wrapped with resilience.
 */
export type RequestHandler<T> = (...args: any[]) => Promise<T>;

/**
 * TODO: Add JSDoc later.
 */
export interface MiddlewareInOutOptions<T> {
  fn: RequestHandler<T>;
  context?: RequestContext;
  exitChain?: boolean;
}

/**
 * TODO: Add JSDoc later.
 */
export type Middleware<T> = (
  options: MiddlewareInOutOptions<T>
) => MiddlewareInOutOptions<T>;
