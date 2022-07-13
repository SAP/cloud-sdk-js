import asyncRetry from 'async-retry';
import { createLogger } from '@sap-cloud-sdk/util';
import { getCircuitBreaker } from './circuit-breaker';
import {
  CircuitBreakerOptions,
  defaultCircuitBreakerOptions
} from './circuit-breaker-options';
import {
  AsyncRetryLibOptions,
  defaultResilienceOptions,
  defaultRetryOptions,
  isCircuitBreakerOptionsServiceTarget,
  isRetryOptionsServiceTarget,
  ResilienceOptions,
  RetryOptions
} from './resilience-options';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'resilience'
});

/**
 * Type of the request handler that needs to be wrapped with resilience.
 */
export type RequestHandler<ReturnType> = (
  ...args: any[]
) => Promise<ReturnType>;

/**
 * Create a promise for a time out race.
 * @param timeout - Value for the timeout.
 * @returns A promise which times out after the given time.
 * @internal
 */
async function timeoutPromise<T>(timeout: number): Promise<T> {
  return new Promise<T>((_, reject) =>
    setTimeout(() => reject(new Error(`Timed out after ${timeout}ms`)), timeout)
  );
}

/**
 * Add time out to a function call.
 * @param requestHandler - Function handler with empty parameter.
 * @param timeout - t.
 * @returns TODO: Add JSDoc later.
 * @internal
 */
export function addTimeout<T>(
  requestHandler: RequestHandler<T>,
  timeout: number
): Promise<T> {
  // If timeout is non-positive, we don't add timeout to the promise.
  if (timeout <= 0) {
    return requestHandler();
  }
  const racePromise = timeoutPromise<T>(timeout);
  return Promise.race([requestHandler(), racePromise]);
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceOptions - TODO: Add JSDoc later.
 * @returns - TODO: Add JSDoc later.
 * @internal
 */
export function normalizeTimeout(
  resilienceOptions: ResilienceOptions
): ResilienceOptions {
  if (resilienceOptions.timeout === undefined) {
    resilienceOptions.timeout = defaultResilienceOptions.timeout;
  }

  if (resilienceOptions.timeout !== false && resilienceOptions.timeout <= 0) {
    logger.warn(
      `Invalid time out (${resilienceOptions.timeout}) received! Disabling resilience time out.`
    );
    // Disable time out if invalid
    resilienceOptions.timeout = false;
  }
  return resilienceOptions;
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceOptions - TODO: Add JSDoc later.
 * @returns - TODO: Add JSDoc later.
 * @internal
 */
export function normalizeCircuitBreakerOptions(
  resilienceOptions: ResilienceOptions
): ResilienceOptions {
  if (resilienceOptions.circuitBreaker === undefined) {
    // Circuit breaker is enabled by default
    resilienceOptions.circuitBreaker = defaultResilienceOptions.circuitBreaker;
  }

  if (resilienceOptions.circuitBreaker === true) {
    // Circuit breaker is true, use default circuit breaker options with resilience timeout
    resilienceOptions.circuitBreaker = {
      ...defaultCircuitBreakerOptions,
      timeout: resilienceOptions.timeout
    };
  } else if (
    isCircuitBreakerOptionsServiceTarget(resilienceOptions.circuitBreaker)
  ) {
    // Circuit breaker is in the form of { service: ..., target: ... }
    if (resilienceOptions.circuitBreaker.service === true) {
      resilienceOptions.circuitBreaker.service = {
        ...defaultCircuitBreakerOptions,
        timeout: resilienceOptions.timeout
      };
    } else if (resilienceOptions.circuitBreaker.service) {
      // Circuit breaker service is defined explicitly
      if (resilienceOptions.timeout) {
        logger.debug(
          'Resilience timeout is ignored since circuit breaker service is defined explicitly.'
        );
      }
    }
    if (resilienceOptions.circuitBreaker.target === true) {
      resilienceOptions.circuitBreaker.target = {
        ...defaultCircuitBreakerOptions,
        timeout: resilienceOptions.timeout
      };
    } else if (resilienceOptions.circuitBreaker.service) {
      // Circuit breaker target is defined explicitly
      if (resilienceOptions.timeout) {
        logger.debug(
          'Resilience timeout is ignored since circuit breaker target is defined explicitly.'
        );
      }
    }
  } else {
    // Circuit breaker is defined explicitly
    if (resilienceOptions.timeout) {
      logger.debug(
        'Resilience timeout is ignored since circuit breaker is defined explicitly.'
      );
    }
  }

  return resilienceOptions;
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceOptions - TODO: Add JSDoc later.
 * @returns - TODO: Add JSDoc later.
 * @internal
 */
export function normalizeRetryOptions(
  resilienceOptions: ResilienceOptions
): ResilienceOptions {
  if (resilienceOptions.retry === undefined) {
    resilienceOptions.retry = defaultResilienceOptions.retry;
  }

  if (resilienceOptions.retry === true) {
    resilienceOptions.retry = defaultRetryOptions;
  } else if (isRetryOptionsServiceTarget(resilienceOptions.retry)) {
    if (resilienceOptions.retry.service === true) {
      resilienceOptions.retry.service = defaultRetryOptions;
    }
    if (resilienceOptions.retry.target === true) {
      resilienceOptions.retry.target = defaultRetryOptions;
    }
  }
  return resilienceOptions;
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceOptions - TODO: Add JSDoc later.
 * @returns - TODO: Add JSDoc later.
 * @internal
 */
export function normalizeResilienceOptions(
  resilienceOptions: ResilienceOptions
): ResilienceOptions {
  resilienceOptions = normalizeTimeout(resilienceOptions);
  resilienceOptions = normalizeCircuitBreakerOptions(resilienceOptions);
  resilienceOptions = normalizeRetryOptions(resilienceOptions);

  return resilienceOptions;
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
  request: { fn: RequestHandler<T>; args?: any[] },
  resilienceOptions: ResilienceOptions,
  requestType?: 'service' | 'target'
): RequestHandler<T> {
  const { timeout, retry, circuitBreaker } =
    normalizeResilienceOptions(resilienceOptions);

  const args = request.args ?? [];

  // Circuit breaker + timeout
  let finalCircuitBreaker: CircuitBreakerOptions;

  if (isCircuitBreakerOptionsServiceTarget(circuitBreaker)) {
    if (requestType === 'service') {
      finalCircuitBreaker = circuitBreaker.service;
    } else if (requestType === 'target') {
      finalCircuitBreaker = circuitBreaker.target;
    } else {
      logger.warn(
        'Unknown request type for adding resilience. Using `service` circuit breaker by default.'
      );
      finalCircuitBreaker = circuitBreaker.service;
    }
  } else {
    finalCircuitBreaker = circuitBreaker;
  }

  let timeoutOrCircuitBreakerfn: RequestHandler<T>;

  if (finalCircuitBreaker) {
    // Add circuit breaker
    timeoutOrCircuitBreakerfn = () =>
      getCircuitBreaker(() => request.fn(...args), finalCircuitBreaker).fire();
  } else {
    // Add our own timeout
    if (timeout) {
      timeoutOrCircuitBreakerfn = () =>
        addTimeout(() => request.fn(...args), timeout);
    } else {
      timeoutOrCircuitBreakerfn = () => request.fn(...args);
    }
  }

  // Retry
  let finalRetry: RetryOptions;

  if (isRetryOptionsServiceTarget(retry)) {
    if (requestType === 'service') {
      finalRetry = retry.service;
    } else if (requestType === 'target') {
      finalRetry = retry.target;
    } else {
      logger.warn(
        'Unknown request type for adding resilience. Using `service` retry by default.'
      );
      finalRetry = retry.service;
    }
  } else {
    finalRetry = retry;
  }

  let retryOrNotFn: RequestHandler<T>;
  if (finalRetry) {
    retryOrNotFn = () =>
      asyncRetry(
        async () => timeoutOrCircuitBreakerfn(),
        finalRetry as AsyncRetryLibOptions
      );
  } else {
    retryOrNotFn = () => timeoutOrCircuitBreakerfn();
  }

  return retryOrNotFn;
}
