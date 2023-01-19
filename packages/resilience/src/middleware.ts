// eslint-disable-next-line import/named
import { AxiosRequestConfig } from 'axios';

/**
 * Context for HttpRequests of the middleware.
 */
export interface HttpMiddlewareContext extends Context {
  /**
   * JWT used in the request.
   */
  jwt?: string;
  /**
   * Destination name used in the request.
   */
  destinationName?: string;
  /**
   * Request config.
   */
  requestConfig: AxiosRequestConfig;
}

/**
 * Input parameter of a middleware.
 */
export interface MiddlewareIn<ReturnT, ContextT extends Context> {
  /**
   * Initial function enriched by the middleware e.g. axios request getting a timeout.
   */
  fn: () => Promise<ReturnT>;
  /**
   * Context of the execution e.g. the request context or URL.
   */
  context: ContextT;
  /**
   * Call this method to disable all following middlewares.
   */
  skipNext: SkipNext;
}

/**
 * Type of the skip next method.
 */
export interface SkipNext {
  (): void;

  /**
   * Initially the called property is false and becomes true after invocation.
   */
  called: boolean;
}

/**
 * Return type of middlewares.
 */
export type MiddlewareOut<ReturnT> = () => Promise<ReturnT>;

/**
 * Minimal Context of the middleware.
 */
export interface Context {
  /**
   * URI of the function passed to the middleware.
   */
  uri: string;
  /**
   * Tenant identifier.
   */
  tenantId: string;
}

/**
 * Middleware type - This function takes some initial function and returns a function.
 * The input is the MiddlewareIn containing the initial function and some context information e.g. axios request and the request context.
 * It returns a new functions with some additional feature e.g. timeout.
 */
export type Middleware<ReturnT, ContextT extends Context> = (
  options: MiddlewareIn<ReturnT, ContextT>
) => MiddlewareOut<ReturnT>;

/**
 * Helper function to join a list of middlewares given an initial input.
 * @param middlewares - Middlewares to be layered around the function.
 * @param context - Context for the middleware execution.
 * @param fn - Function around which the middlewares are added.
 * @returns Function with middlewares layered around it.
 * @internal
 */
export function executeWithMiddleware<ReturnT, ContextT extends Context>(
  middlewares: Middleware<ReturnT, ContextT>[] | undefined,
  context: ContextT,
  fn: () => Promise<ReturnT>
): Promise<ReturnT> {
  if (!middlewares?.length) {
    return fn();
  }

  // The skipNext function is called in the middleware to skip the next middlewares
  const skipNext = function () {
    skipNext.called = true;
  };
  skipNext.called = false;

  const initial = { context, fn, skipNext };
  const functionWithMiddlewares = addMiddlewaresToInitialFunction(
    middlewares,
    initial
  );
  return functionWithMiddlewares();
}

/**
 * .
 *
 * This functions adds the middlewares to the initial functions.
 * You start with a function (axios request function) and add a timeout, circuit-breaker etc..
 * The result is new a function containing a timeout, circuit-breaker etc..
 * Note that the actual function is not executed.
 * @param middlewares - Middlewares added to the function.
 * @param initial - Initial function and context.
 * @returns The function with the middlewares added.
 */
function addMiddlewaresToInitialFunction<ReturnT, ContextT extends Context>(
  middlewares: Middleware<ReturnT, ContextT>[],
  initial: MiddlewareIn<ReturnT, ContextT>
): MiddlewareOut<ReturnT> {
  const { context, skipNext } = initial;

  const functionWithMiddlewares = middlewares.reduce((prev, curr) => {
    const middlewareAdded = skipNext.called ? prev.fn : curr(prev);
    return { fn: middlewareAdded, context, skipNext };
  }, initial);
  return functionWithMiddlewares.fn;
}
