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
 * Middleware type. The input is the MiddlewareIn and a boolean called skip.
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
  let skip = false;
  const skipNext = () => {
    skip = true;
  };
  const initial = { context, fn, skipNext };
  const withAllMiddlewares = middlewares.reduce((prev, curr) => {
    const wrapped = curr(prev, skip);
    return { fn: wrapped, context, skipNext };
  }, initial);
  return withAllMiddlewares.fn();
}
