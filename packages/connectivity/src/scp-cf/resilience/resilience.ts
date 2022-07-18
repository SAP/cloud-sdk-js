import { getCircuitBreaker } from './circuit-breaker';
import {
  Middleware,
  MiddlewareInOutOptions,
  RequestHandler,
  ResilienceMiddlewareOptions,
  TimeoutOptions
} from './resilience-options';

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
  timeout: TimeoutOptions
): Promise<T> {
  // If timeout is non-positive, we don't add timeout to the promise.
  if (!timeout || timeout < 0) {
    return requestHandler();
  }
  const racePromise = timeoutPromise<T>(timeout);
  return Promise.race([requestHandler(), racePromise]);
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceMiddlewareOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
export function addResilienceMiddlwares<T>(
  resilienceMiddlewareOptions: ResilienceMiddlewareOptions
): Middleware<T>[] {
  return [
    getTimeoutMiddleware(resilienceMiddlewareOptions),
    getCircuitBreakerMiddleware(resilienceMiddlewareOptions)
  ];
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceMiddlewareOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
export function getTimeoutMiddleware<T>(
  resilienceMiddlewareOptions: ResilienceMiddlewareOptions
): Middleware<T> {
  const { timeout, circuitBreaker } = resilienceMiddlewareOptions;
  const circuitBreakerMiddlewareFn = (
    middlewareInOutOptions: MiddlewareInOutOptions<T>
  ) => {
    const timeoutOptions = timeout(middlewareInOutOptions.context);
    const circuitBreakerOptions = circuitBreaker(
      middlewareInOutOptions.context
    );

    if (!circuitBreakerOptions) {
      return addTimeout(() => middlewareInOutOptions.fn(), timeoutOptions);
    }

    return middlewareInOutOptions.fn();
  };

  return (middlewareInOutOptions: MiddlewareInOutOptions<T>) => ({
    fn: circuitBreakerMiddlewareFn,
    context: middlewareInOutOptions.context,
    exitChain: middlewareInOutOptions.exitChain
  });
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceMiddlewareOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
export function getCircuitBreakerMiddleware<T>(
  resilienceMiddlewareOptions: ResilienceMiddlewareOptions
): Middleware<T> {
  const { timeout, circuitBreaker } = resilienceMiddlewareOptions;
  const timeoutMiddlewareFn = (
    middlewareInOutOptions: MiddlewareInOutOptions<T>
  ) => {
    const timeoutOptions = timeout(middlewareInOutOptions.context);
    const circuitBreakerOptions = circuitBreaker(
      middlewareInOutOptions.context
    );

    if (circuitBreakerOptions) {
      return getCircuitBreaker(
        circuitBreakerOptions.id,
        () => middlewareInOutOptions.fn(),
        {
          ...circuitBreakerOptions,
          timeout: timeoutOptions
        }
      ).fire();
    }

    return middlewareInOutOptions.fn();
  };

  return (middlewareInOutOptions: MiddlewareInOutOptions<T>) => ({
    fn: timeoutMiddlewareFn,
    context: middlewareInOutOptions.context,
    exitChain: middlewareInOutOptions.exitChain
  });
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceMiddlewareOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
export function resilience<T>(
  resilienceMiddlewareOptions: ResilienceMiddlewareOptions
): Middleware<T> {
  const resilienceMiddlewares: Middleware<T>[] = addResilienceMiddlwares(
    resilienceMiddlewareOptions
  );
  const reducedMiddleware = resilienceMiddlewares.reduce(
    (prev, curr) => (middlewareInOutOptions: MiddlewareInOutOptions<T>) =>
      curr(prev(middlewareInOutOptions))
  );
  return (middlewareInOutOptions: MiddlewareInOutOptions<T>) =>
    reducedMiddleware(middlewareInOutOptions);
}
