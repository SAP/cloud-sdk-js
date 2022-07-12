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

type RequestHandler<ReturnType> = (...args: any[]) => Promise<ReturnType>;

/**
 * Creates a promise for a timeout race.
 * @internal
 * @param timeout - Value for the timeout.
 * @returns A promise which times out after the given time.
 */
async function timeOutPromise<T>(timeout: number): Promise<T> {
  return new Promise<T>((_, reject) =>
    setTimeout(() => reject(new Error(`Timed out after ${timeout}ms`)), timeout)
  );
}

/**
 * TODO: Add JSDoc later.
 * @param fn - TODO: Add JSDoc later.
 * @param timeout - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
function addTimeOut<T>(
  fn: RequestHandler<T>,
  timeout: number
): RequestHandler<T> {
  // If timeout is non-positive, we don't add timeout to the promise.
  if (timeout <= 0) {
    return fn;
  }
  const racePromise = timeOutPromise<T>(timeout);
  return () => Promise.race([fn(), racePromise]);
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceOptions - TODO: Add JSDoc later.
 * @returns - TODO: Add JSDoc later.
 */
function normalizeTimeOut(
  resilienceOptions: ResilienceOptions
): ResilienceOptions {
  if (resilienceOptions.timeout && resilienceOptions.timeout < 0) {
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
 */
function normalizeRetryOptions(
  resilienceOptions: ResilienceOptions
): ResilienceOptions {
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
 */
function normalizeCircuitBreakerOptions(
  resilienceOptions: ResilienceOptions
): ResilienceOptions {
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
    }
    if (resilienceOptions.circuitBreaker.target === true) {
      resilienceOptions.circuitBreaker.target = {
        ...defaultCircuitBreakerOptions,
        timeout: resilienceOptions.timeout
      };
    }
  }

  return resilienceOptions;
}

// TODO: write test cases for this!
/**
 * TODO: Add JSDoc later.
 * @param resilienceOptions - TODO: Add JSDoc later.
 * @returns - TODO: Add JSDoc later.
 */
function normalizeResilienceOptions(
  resilienceOptions: ResilienceOptions | undefined
): ResilienceOptions {
  if (!resilienceOptions) {
    return defaultResilienceOptions;
  }

  resilienceOptions = normalizeTimeOut(resilienceOptions);
  resilienceOptions = normalizeRetryOptions(resilienceOptions);
  resilienceOptions = normalizeCircuitBreakerOptions(resilienceOptions);

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
  request: { fn: RequestHandler<T>; args: any[] },
  resilienceOptions: ResilienceOptions,
  requestType?: 'service' | 'target'
): RequestHandler<T> {
  const { timeout, retry, circuitBreaker } =
    normalizeResilienceOptions(resilienceOptions);

  let fn: RequestHandler<T> = async () => request.fn(...request.args);

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

  if (finalCircuitBreaker) {
    // Add circuit breaker
    fn = async () =>
      getCircuitBreaker(fn, finalCircuitBreaker).fire({
        circuitBreaker: false,
        timeout: false
      });
  } else {
    // Add our own timeout
    if (timeout) {
      fn = addTimeOut(fn, timeout);
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

  if (finalRetry) {
    fn = async () => asyncRetry(fn, finalRetry as AsyncRetryLibOptions);
  }

  return fn;
}

export function createResilienceFn<T>(
  resilienceOptions: ResilienceOptions,
  requestType?: 'service' | 'target'
) {
  return async (fn: RequestHandler<T>) => addResilience(fn, resilienceOptions, requestType)
}
