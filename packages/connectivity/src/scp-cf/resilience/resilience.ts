import { createLogger } from '@sap-cloud-sdk/util';
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

/**
 * Creates a promise for a timeout race.
 * @internal
 * @param timeout - Value for the timeout.
 * @returns A promise which times out after the given time.
 */
export async function timeoutPromise<T>(timeout: number): Promise<T> {
  return new Promise<T>((_, reject) =>
    setTimeout(() => reject(new Error(`Timed out after ${timeout}ms`)), timeout)
  );
}

/**
 * Wrap the promise with timeout if timeout is a positive number.
 * @param promise - Promise that will be wrapped with timeout.
 * @param timeout - A positive number for the timeout in millisecond.
 * @returns Wrapped promise with timeout if timeout is a positive number.
 */
export async function addTimeOut<T>(
  promise: Promise<T>,
  timeout: number
): Promise<T> {
  // If timeout is non-positive, we don't add timeout to the promise.
  if (timeout <= 0) {
    return promise;
  }
  const racePromise = timeoutPromise<T>(timeout);
  return Promise.race([promise, racePromise]);
}

// TODO: write test cases for this!
/**
 * TODO: Add JSDoc later.
 * @param resilienceOptions - TODO: Add JSDoc later.
 * @returns - TODO: Add JSDoc later.
 */
export function formalizeResilienceOptions(
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
