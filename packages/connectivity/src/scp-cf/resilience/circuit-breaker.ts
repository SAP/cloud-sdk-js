import CircuitBreaker from 'opossum';
import {
  CircuitBreakerOptions,
  OpossumLibOptions,
  defaultCircuitBreakerOptions
} from './circuit-breaker-options';

type RequestHandler<ReturnType> = (...args: any[]) => Promise<ReturnType>;

const circuitBreakerMap = new Map<
  RequestHandler<any>,
  CircuitBreaker<any[], any>
>();

/**
 * TODO: Add JSDoc later.
 * @param circuitBreakerOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
function transformCircuitBreakerOptionsToOpossumLibOptions(
  circuitBreakerOptions: CircuitBreakerOptions
): OpossumLibOptions {
  if (!circuitBreakerOptions) {
    throw new Error(
      'Failed to transform CircuitBreakerOptions to OpossumLibOptions! `circuitBreakerOptions` is `undefined` or `false`'
    );
  } else if (circuitBreakerOptions === true) {
    return defaultCircuitBreakerOptions;
  } else {
    return circuitBreakerOptions;
  }
}

/**
 * TODO: Add JSDoc later.
 * @param requestHandler - TODO: Add JSDoc later.
 * @param circuitBreakerOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
export function createCircuitBreaker<ReturnType>(
  requestHandler: RequestHandler<ReturnType>,
  circuitBreakerOptions: CircuitBreakerOptions = defaultCircuitBreakerOptions
): CircuitBreaker {
  const opossumLibOptions = transformCircuitBreakerOptionsToOpossumLibOptions(
    circuitBreakerOptions
  );
  const circuitBreaker = new CircuitBreaker(requestHandler, opossumLibOptions);
  return circuitBreaker;
}

/**
 * TODO: Add JSDoc later.
 * @param requestHandler - TODO: Add JSDoc later.
 * @param circuitBreakerOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
export function getCircuitBreaker<ReturnType>(
  requestHandler: RequestHandler<ReturnType>,
  circuitBreakerOptions: CircuitBreakerOptions = defaultCircuitBreakerOptions
): CircuitBreaker<any[], any> {
  if (!circuitBreakerMap.has(requestHandler)) {
    const circuitBreaker = createCircuitBreaker(
      requestHandler,
      circuitBreakerOptions
    );
    circuitBreakerMap.set(requestHandler, circuitBreaker);
  }
  return circuitBreakerMap.get(requestHandler)!;
}
