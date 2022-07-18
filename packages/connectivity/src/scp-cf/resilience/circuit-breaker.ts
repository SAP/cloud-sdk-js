import CircuitBreaker from 'opossum';
import { OpossumLibOptions } from './circuit-breaker-options';

type RequestHandler<ReturnType> = (...args: any[]) => Promise<ReturnType>;

const circuitBreakerMap = new Map<string, CircuitBreaker<any[], any>>();

/**
 * TODO: Add JSDoc later.
 * @param requestHandler - TODO: Add JSDoc later.
 * @param circuitBreakerOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 * @internal
 */
export function createCircuitBreaker<T>(
  id: string,
  requestHandler: RequestHandler<T>,
  opossumLibOptions: OpossumLibOptions
): CircuitBreaker {
  const circuitBreaker = new CircuitBreaker(requestHandler, opossumLibOptions);
  circuitBreakerMap.set(id, circuitBreaker);
  return circuitBreaker;
}

/**
 * TODO: Add JSDoc later.
 * @param requestHandler - TODO: Add JSDoc later.
 * @param circuitBreakerOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 * @internal
 */
export function getCircuitBreaker<T>(
  id: string,
  requestHandler: RequestHandler<T>,
  opossumLibOptions: OpossumLibOptions
): CircuitBreaker<any[], any> {
  if (!circuitBreakerMap.has(id)) {
    return createCircuitBreaker(id, requestHandler, opossumLibOptions);
  }
  return circuitBreakerMap.get(id)!;
}
