import { createCircuitBreaker } from './circuit-breaker';
import { resilienceMiddlewareManager } from './resilience-middleware-manager';
import {
  defaultResilienceOptions,
  Middleware,
  MiddlewareInOutOptions,
  RequestHandler,
  ResilienceMiddlewareOptions,
  ResilienceOptions,
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
 * @internal
 */
export function createTimeoutMiddleware<T>(
  resilienceMiddlewareOptions: ResilienceMiddlewareOptions
): Middleware<T> {
  const { timeout } = resilienceMiddlewareOptions;
  const circuitBreakerMiddlewareFn = (
    middlewareInOutOptions: MiddlewareInOutOptions<T>
  ) => {
    const timeoutOptions = timeout();
    return addTimeout(middlewareInOutOptions.fn, timeoutOptions);
  };

  return (middlewareInOutOptions: MiddlewareInOutOptions<T>) => ({
    fn: () => circuitBreakerMiddlewareFn(middlewareInOutOptions),
    exitChain: middlewareInOutOptions.exitChain
  });
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceMiddlewareOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 * @internal
 */
export function createCircuitBreakerMiddleware<T>(
  resilienceMiddlewareOptions: ResilienceMiddlewareOptions
): Middleware<T> {
  const { circuitBreaker } = resilienceMiddlewareOptions;
  const circuitBreakerMiddlewareFn = (
    middlewareInOutOptions: MiddlewareInOutOptions<T>
  ) => {
    const circuitBreakerOptions = circuitBreaker();

    if (circuitBreakerOptions) {
      return createCircuitBreaker({
        ...circuitBreakerOptions
      }).fire(middlewareInOutOptions.fn);
    }

    return middlewareInOutOptions.fn();
  };

  return (middlewareInOutOptions: MiddlewareInOutOptions<T>) => ({
    fn: () => circuitBreakerMiddlewareFn(middlewareInOutOptions),
    exitChain: middlewareInOutOptions.exitChain
  });
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceMiddlewareOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 * @internal
 */
export function createResilienceMiddlewareList<T>(
  resilienceMiddlewareOptions: ResilienceMiddlewareOptions
): Middleware<T>[] {
  // From innermost to outtermost middleware:
  // e.g., [a, b, c] -> c(b(a))
  // The order of Retry(CB(Timeout)) should be [Timeout, CB, Retry], which makes sense.
  return [
    createTimeoutMiddleware(resilienceMiddlewareOptions),
    createCircuitBreakerMiddleware(resilienceMiddlewareOptions)
  ];
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceMiddlewareOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 * @internal
 */
export function createResilienceMiddleware<T>(
  resilienceMiddlewareOptions: ResilienceMiddlewareOptions
): Middleware<T> {
  const resilienceMiddlewares: Middleware<T>[] = createResilienceMiddlewareList(
    resilienceMiddlewareOptions
  );
  const reducedMiddleware = resilienceMiddlewares.reduce(
    (prev, curr) => (middlewareInOutOptions: MiddlewareInOutOptions<T>) => {
      if (middlewareInOutOptions.exitChain) {
        return prev(middlewareInOutOptions);
      }
      return curr(prev(middlewareInOutOptions));
    }
  );
  return reducedMiddleware;
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceMiddlewareOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
export function resilience<T>(
  resilienceMiddlewareOptions: ResilienceMiddlewareOptions
): Middleware<T> {
  const { id } = resilienceMiddlewareOptions;
  let middleware = resilienceMiddlewareManager.get<T>(id);
  if (middleware) {
    if (resilienceMiddlewareManager.verify(resilienceMiddlewareOptions)) {
      // id matches the options
      return middleware;
    }
    throw new Error(
      `Id '${id}' has already been used by another resilience middleware with different options!`
    );
  } else {
    middleware = createResilienceMiddleware<T>(resilienceMiddlewareOptions);
    resilienceMiddlewareManager.setWithOptions<T>(
      resilienceMiddlewareOptions,
      middleware
    );
    return middleware;
  }
}

/**
 * TODO: Add JSDoc later.
 * @param fn - TODO: Add JSDoc later.
 * @param options - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
export function callWithResilience<T>(
  fn: RequestHandler<T>,
  options: ResilienceOptions & { resilience?: ResilienceMiddlewareOptions }
): Promise<T> {
  const timeout =
    options.resilience?.timeout ||
    (options.timeout
      ? () => options.timeout as number
      : defaultResilienceOptions.timeout);
  const circuitBreaker =
    options.resilience?.circuitBreaker ||
    (options.enableCircuitBreaker
      ? defaultResilienceOptions.circuitBreaker
      : () => false as const);
  const resilienceMiddleware = resilience<T>({
    id: options.resilience?.id ?? 'btpService-' + fn.name,
    timeout,
    circuitBreaker
  });

  return resilienceMiddleware({
    fn,
    exitChain: false
  }).fn();
}
