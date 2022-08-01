import { createCircuitBreaker } from './circuit-breaker';
import {
  defaultResilienceOptions,
  Middleware,
  MiddlewareInOutOptions,
  RequestHandler,
  ResilienceMiddlewareOptions,
  ResilienceOptions,
  TimeoutOptions
} from './resilience-options';

interface ResilienceMiddlewareMapValue {
  middleware: Middleware<any>;
  options: Omit<ResilienceMiddlewareOptions, 'id'>;
}
const resilienceMiddlewareMap = new Map<string, ResilienceMiddlewareMapValue>();

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
  const { timeout, circuitBreaker } = resilienceMiddlewareOptions;
  const timeoutMiddlewareFn = (
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
    fn: () => timeoutMiddlewareFn(middlewareInOutOptions),
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
  resilienceMiddlewareMap.set(resilienceMiddlewareOptions.id, {
    middleware: reducedMiddleware,
    options: resilienceMiddlewareOptions
  });

  return reducedMiddleware;
}

/**
 * TODO: Add JSDoc later.
 * @param id - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
export function getResilienceMiddleware(
  id: string
): Middleware<any> | undefined {
  return resilienceMiddlewareMap.get(id)?.middleware;
}

/**
 * TODO: Add JSDoc later.
 * @param resilienceMiddlewareOptions - TODO: Add JSDoc later.
 * @returns TODO: Add JSDoc later.
 */
export function resilience(
  resilienceMiddlewareOptions: ResilienceMiddlewareOptions
): Middleware<any> {
  const { id } = resilienceMiddlewareOptions;
  const middlewareOptionsPair = resilienceMiddlewareMap.get(
    resilienceMiddlewareOptions.id
  );
  if (middlewareOptionsPair) {
    const { middleware, options } = middlewareOptionsPair;
    if (
      resilienceMiddlewareOptions.circuitBreaker() ===
        options.circuitBreaker() &&
      resilienceMiddlewareOptions.timeout() === options.timeout()
    ) {
      throw new Error(
        `Id '${id}' has already been used by another resilience middleware with different options!`
      );
    }
    return middleware;
  }
  return createResilienceMiddleware(resilienceMiddlewareOptions);
}

/**
 * TODO: Add JSDoc later.
 */
export function clearResilienceMiddlewareMap(): void {
  resilienceMiddlewareMap.clear();
}

/**
 * Delete resilience middleware from the map.
 * @param id - Id of the resilience middleware. Used as key of the entry in the map.
 * @returns `true` if deletion was successful. `false` otherwise.
 */
export function deleteResilienceMiddleware(id: string): boolean {
  return resilienceMiddlewareMap.delete(id);
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

  const id = options.resilience?.id ?? 'btpService-default';

  const resilienceMiddleware = resilience({
    id: options.resilience?.id ?? 'btpService-default',
    timeout,
    circuitBreaker
  });

  return resilienceMiddleware({
    fn,
    exitChain: false
  }).fn();
}
