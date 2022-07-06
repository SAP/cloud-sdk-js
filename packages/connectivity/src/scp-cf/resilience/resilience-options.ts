import { StringValue } from 'ms';
import { CircuitBreakerOptions } from './circuit-breaker-options';

/**
 * TODO: Add JSDoc later.
 */
export interface AsyncRetryLibOptions {
  retries?: number; // default 10
  factor?: number; // default  2.
  minTimeout?: StringValue; // default 1000 ms. See https://github.com/vercel/ms
  maxTimeout?: StringValue; // default Infinity. See https://github.com/vercel/ms
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
 */
export interface CircuitBreakerOptionsServiceTarget {
  service: CircuitBreakerOptions;
  target: CircuitBreakerOptions;
}

/**
 * Options to configure resilience when fetching destinations.
 */
export interface ResilienceOptions {
  /**
   * Timeout in milliseconds to retrieve the destination.
   */
  timeout?: number;
  retry?: RetryOptions | { service: RetryOptions; target: RetryOptions };
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
