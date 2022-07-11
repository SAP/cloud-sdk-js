import { createLogger } from '@sap-cloud-sdk/util';
import { getCircuitBreaker } from './circuit-breaker';
import {
  CircuitBreakerOptions,
  defaultCircuitBreakerOptions
} from './circuit-breaker-options';
import {
  CircuitBreakerOptionsServiceTarget,
  defaultResilienceOptions,
  ResilienceOptions
} from './resilience-options';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'resilience'
});

type RequestHandler<ReturnType> = (...args: any[]) => Promise<ReturnType>;

/**
 * @internal
 */
function isCircuitBreakerOptionsServiceTarget(
  options: CircuitBreakerOptions | CircuitBreakerOptionsServiceTarget
): options is CircuitBreakerOptionsServiceTarget {
  if (typeof options === 'object') {
    return 'service' in options || 'target' in options;
  }
  return false;
}

/**
 * Creates a promise for a timeout race.
 * @internal
 * @param timeout - Value for the timeout.
 * @returns A promise which times out after the given time.
 */
async function timeoutPromise<T>(timeout: number): Promise<T> {
  return new Promise<T>((_, reject) =>
    setTimeout(() => reject(new Error(`Timed out after ${timeout}ms`)), timeout)
  );
}

function addTimeOut<T>(request: { fn: RequestHandler<T>; args: any[] }, timeout: number): RequestHandler<T> {
  // If timeout is non-positive, we don't add timeout to the promise.
  if (timeout <= 0) {
    return () => request.fn(...request.args);
  }
  const racePromise = timeoutPromise<T>(timeout);
  return () => Promise.race([request.fn(...request.args), racePromise]);
}

// TODO: write test cases for this!
/**
 * TODO: Add JSDoc later.
 * @param resilienceOptions - TODO: Add JSDoc later.
 * @returns - TODO: Add JSDoc later.
 */
function formalizeResilienceOptions(
  resilienceOptions: ResilienceOptions | undefined
): Required<ResilienceOptions> {
  if (!resilienceOptions) {
    return defaultResilienceOptions;
  }

  /* Make sure timeout is always defined and valid */
  if (resilienceOptions.timeout === undefined) {
    // Set timeout to default if undefined
    resilienceOptions.timeout = defaultResilienceOptions.timeout;
  } else if (resilienceOptions.timeout < 0) {
    // Set timeout to 0 if invalid.
    // 0 means no reslience timeout and it will not be used to overwrite circuit breaker timeout.
    resilienceOptions.timeout = 0;
  }

  if (!resilienceOptions.retry) {
    resilienceOptions.retry = false;
  }

  /* Circuit breaker is falsy, no need to apply resilience timeout to any circuit breaker timeout. */
  if (!resilienceOptions.circuitBreaker) {
    resilienceOptions.circuitBreaker = false;
    // Cast type as required since ts cannot determine whether timeout is undefined, which is always defined as guaranteed above.
    return resilienceOptions as Required<ResilienceOptions>;
  }

  /* Overwrite circuit breaker timeout with the resilience timeout whenever is possible. */
  if (resilienceOptions.circuitBreaker === true) {
    // Circuit breaker is set to true, replace true with defaultCircuitBreakerOptions.
    resilienceOptions.circuitBreaker = defaultCircuitBreakerOptions;
    // Replace the default circuit breaker timeout with the resilience timeout if set and > 0.
    if (resilienceOptions.timeout) {
      resilienceOptions.circuitBreaker.timeout = resilienceOptions.timeout;
    }
  } else if (
    isCircuitBreakerOptionsServiceTarget(resilienceOptions.circuitBreaker)
  ) {
    // Circuit breaker is in the form of { service: ..., target: ... }
    if (resilienceOptions.circuitBreaker.service === true) {
      // Service is set to true, replace true with defaultCircuitBreakerOptions.
      resilienceOptions.circuitBreaker.service = defaultCircuitBreakerOptions;
      // Replace the default circuit breaker timeout for service with the resilience timeout if set and > 0.
      if (resilienceOptions.timeout) {
        resilienceOptions.circuitBreaker.service.timeout =
          resilienceOptions.timeout;
      }
    }
    if (resilienceOptions.circuitBreaker.target === true) {
      // Target is set to true, replace true with defaultCircuitBreakerOptions.
      resilienceOptions.circuitBreaker.target = defaultCircuitBreakerOptions;
      // Replace the default circuit breaker timeout for target with the resilience timeout if set and > 0.
      if (resilienceOptions.timeout) {
        resilienceOptions.circuitBreaker.target.timeout =
          resilienceOptions.timeout;
      }
    }
  } else {
    // Circuit breaker is in the type of OpossumLibOptions,
    if (resilienceOptions.circuitBreaker.timeout) {
      if (resilienceOptions.timeout) {
        // Resilience timeout has a higher priority.
        logger.warn(
          'Duplicated timeout found for both ResilienceOptions and CircuitBreakerOptions! Overwriting circuit breaker timeout with the reslience timeout.'
        );
        resilienceOptions.circuitBreaker.timeout = resilienceOptions.timeout;
      }
    }
  }

  return resilienceOptions as Required<ResilienceOptions>;
}

/**
 * TODO: Add JSDoc later.
 * @param request - TODO: Add JSDoc later.
 * @param request.fn - TODO: Add JSDoc later.
 * @param request.args - TODO: Add JSDoc later.
 * @param resilienceOptions - TODO: Add JSDoc later.
 * @param requestType - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
export function addResilience<T>(
  request: { fn: RequestHandler<T>; args: any[] },
  resilienceOptions: ResilienceOptions,
  requestType?: 'service' | 'target'
): RequestHandler<T> {
  const { timeout, retry, circuitBreaker } =
    formalizeResilienceOptions(resilienceOptions);

  let ret: RequestHandler<T>;

  let finalCircuitBreaker: CircuitBreakerOptions = false;

  if (isCircuitBreakerOptionsServiceTarget(circuitBreaker)) {
    if (requestType === 'service') {
      finalCircuitBreaker = circuitBreaker.service;
    } else if (requestType === 'target') {
      finalCircuitBreaker = circuitBreaker.target;
    } else {
      logger.warn(
        'Unknown request type for adding resilience. Use `target` by default.'
      );
      finalCircuitBreaker = circuitBreaker.target;
    }
  }

  if (finalCircuitBreaker) {
    // Add circuit breaker
    ret = async () =>
      getCircuitBreaker(() => request.fn(...request.args), finalCircuitBreaker).fire({
        circuitBreaker: false,
        timeout: 0
      });
  } else {
    // Add our own timeout
    ret = addTimeOut(request, timeout);
  }

  return ret;
}
