import { CircuitBreakerOptions } from './circuit-breaker-options';

/**
 * TODO: Add JSDoc later.
 * @internal
 */
export interface AsyncRetryLibOptions {
  retries?: number; // default 10
  factor?: number; // default  2.
  minTimeout?: number; // default 1000 ms. See https://github.com/vercel/ms
  maxTimeout?: number; // default Infinity. See https://github.com/vercel/ms
  randomize?: boolean; // default true.
  onRetry?: (e: Error) => any; // default undefined
}

/**
 * TODO: Add JSDoc later.
 */
export type RetryOptions = undefined | true | false | AsyncRetryLibOptions;

/**
 * TODO: Add JSDoc later.
 */
export const defaultRetryOptions: AsyncRetryLibOptions = {
  retries: 10,
  factor: 2,
  minTimeout: 1000,
  maxTimeout: Infinity,
  randomize: true
};

/**
 * TODO: Add JSDoc later.
 * @internal
 */
export interface CircuitBreakerOptionsServiceTarget {
  service: CircuitBreakerOptions;
  target: CircuitBreakerOptions;
}

/**
 * TODO: Add JSDoc later.
 * @internal
 */
export interface RetryOptionsServiceTarget {
  service: RetryOptions;
  target: RetryOptions;
}

/**
 * Options to configure resilience when fetching destinations.
 */
export interface ResilienceOptions {
  /**
   * Timeout in milliseconds to retrieve the destination.
   */
  timeout?: number | false;
  retry?: RetryOptions | RetryOptionsServiceTarget;
  circuitBreaker?: CircuitBreakerOptions | CircuitBreakerOptionsServiceTarget;
}

/**
 * TODO: Add JSDoc later.
 */
export const defaultResilienceOptions: Required<ResilienceOptions> = {
  timeout: 10000,
  retry: false,
  circuitBreaker: true
};

/**
 * @internal
 */
export function isCircuitBreakerOptionsServiceTarget(
  options: CircuitBreakerOptions | CircuitBreakerOptionsServiceTarget
): options is CircuitBreakerOptionsServiceTarget {
  if (typeof options === 'object') {
    return 'service' in options || 'target' in options;
  }
  return false;
}
