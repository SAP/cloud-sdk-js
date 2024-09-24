import { timeout } from './timeout';
import { retry } from './retry';
import { circuitBreaker } from './circuit-breaker';
import type { MiddlewareContext, Middleware } from './middleware';
/**
 * Interface for Resilience Options.
 */
export interface ResilienceOptions {
  /**
   * Option for retry middleware.
   * False by default. If set to true, the number of retries is 3.
   * Assign a different value to set custom number of reties.
   */
  retry?: boolean | number;
  /**
   * Option for timeout middleware.
   * True by default, with a 10000 milliseconds timeout.
   * Assign a different value to set a custom timeout.
   */
  timeout?: boolean | number;
  /**
   * Option for circuit breaker middleware.
   * True by default. Set false to disable.
   */
  circuitBreaker?: boolean;
}

const defaultResilienceOptions: ResilienceOptions = {
  retry: false,
  timeout: true,
  circuitBreaker: true
};

/**
 * Return the resilience middleware functions as an array.
 * By default, timeout and circuit breaker are enabled and retry is disabled.
 * This behavior can be overridden by adjusting the resilience options {@link ResilienceOptions}.
 * @param options - Resilience Options.
 * @returns Array of middleware functions.
 */
export function resilience<
  ArgumentT,
  ReturnT,
  ContextT extends MiddlewareContext<ArgumentT>
>(options?: ResilienceOptions): Middleware<ArgumentT, ReturnT, ContextT>[] {
  const resilienceOption = { ...defaultResilienceOptions, ...options };
  const middlewares: Middleware<ArgumentT, ReturnT, ContextT>[] = [];
  if (typeof resilienceOption.retry === 'number') {
    middlewares.push(retry(resilienceOption.retry));
  } else if (resilienceOption.retry) {
    middlewares.push(retry());
  }

  if (resilienceOption.circuitBreaker) {
    middlewares.push(circuitBreaker());
  }

  if (typeof resilienceOption.timeout === 'number') {
    middlewares.push(timeout(resilienceOption.timeout));
  } else if (resilienceOption.timeout) {
    middlewares.push(timeout());
  }

  return middlewares;
}
