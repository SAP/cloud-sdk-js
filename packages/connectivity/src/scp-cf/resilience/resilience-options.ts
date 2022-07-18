import { CircuitBreakerOptions } from './circuit-breaker-options';

/**
 * TODO: Add JSDoc later.
 * @internal
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
  timeout?: number | false;
  circuitBreaker?: CircuitBreakerOptions | CircuitBreakerOptionsServiceTarget;
}

/**
 * TODO: Add JSDoc later.
 */
export const defaultResilienceOptions: Required<ResilienceOptions> = {
  timeout: 10000,
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
