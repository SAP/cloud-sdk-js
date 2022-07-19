import CircuitBreaker from 'opossum';
import { OpossumLibOptions } from './circuit-breaker-options';
import { RequestHandler } from './resilience-options';

function executeFunction<T>(
  fn: RequestHandler<T>,
  ...args: Parameters<RequestHandler<T>>
): Promise<T> {
  return fn(...args);
}

/**
 * TODO: Add JSDoc later.
 * @param requestHandler - TODO: Add JSDoc later.
 * @param circuitBreakerOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 * @internal
 */
export function createCircuitBreaker(
  opossumLibOptions: OpossumLibOptions
): CircuitBreaker<any[], any> {
  return new CircuitBreaker(executeFunction, opossumLibOptions);
}
