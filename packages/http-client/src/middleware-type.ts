import { HttpRequestConfig } from './http-client-types';

/**
 * In/out parameter in the chain of middlewares.
 */
export interface MiddlewareIn<ReturnT, ContextT extends Context> {
  /**
   * Function executed inside the middleware.
   */
  fn: () => Promise<ReturnT>;
  /**
   * Context of the execution.
   */
  context: ContextT;
  /**
   * Call this method to disable all following middlewares.
   */
  skipNext: () => void;
}

/**
 * Function wrapped in the middleware.
 */
export type MiddlewareOut<ReturnT> = () => Promise<ReturnT>;

/**
 * Minimal Context of the middleware.
 */
export interface Context {
  /**
   * Arguments used in the request.
   */
  args: unknown[];
  /**
   * URI of the request wrapped in the middleware.
   */
  uri: string;
}

/**
 * Middleware type - This function takes some function and returns a function.
 * The input is the MiddlewareIn containing the initial function and some context information e.g. axios request and the request context.
 * It returns a functions with some additional feature e.g. timeout.
 * There is also a boolean input argument called skip.
 * The implementation should return the unchanged function if skip is true.
 */
export type Middleware<ReturnT, ContextT extends Context> = (
  options: MiddlewareIn<ReturnT, ContextT>,
  skip: boolean
) => MiddlewareOut<ReturnT>;

/**
 * Context for HttpRequests of the middleware.
 */
export interface HttpMiddlewareContext extends Context {
  /**
   * JWT used in the request.
   */
  jwt?: string;
  /**
   * Request config.
   */
  requestConfig: HttpRequestConfig;
}

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
  if (!middlewares || !middlewares.length) {
    return fn();
  }

  // The skipNext function is called in the middleware to skip the next middlewares
  const skipNext = () => {
    this.state = true;
  };
  skipNext.state = false;

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
 * You start with a function (axios request function) and add a timout, circuit-breaker etc..
 * The result is new a function containing a timeout, circuit-breaker etc..
 * Note that the actual function is not executed.
 * @param middlewares - Middlwares added to the function.
 * @param initial - Initial function and context.
 * @returns The funciton with the middlewares added.
 */
function addMiddlewaresToInitialFunction<ReturnT, ContextT extends Context>(
  middlewares: Middleware<ReturnT, ContextT>[],
  initial: MiddlewareIn<ReturnT, ContextT>
): MiddlewareOut<ReturnT> {
  const { context, skipNext } = initial;
  const functionWithMiddlewares = middlewares.reduce((prev, curr) => {
    const middlewareAdded = curr(prev, initial.skipNext['state']);
    return { fn: middlewareAdded, context, skipNext };
  }, initial);
  return functionWithMiddlewares.fn;
}
