/**
 * Input parameter of a middleware.
 */
export interface MiddlewareOptions<
  ArgumentT,
  ReturnT,
  ContextT extends MiddlewareContext<ArgumentT>
> {
  /**
   * Initial function enriched by the middleware e.g. axios request getting a timeout.
   */
  readonly fn: MiddlewareFunction<ArgumentT, ReturnT>;
  /**
   * Context of the execution e.g. the request context or URL.
   */
  context: ContextT;
  /**
   * Call this method to disable all following middlewares.
   */
  readonly skipNext: SkipNext;
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
 * Minimal Context of the middleware.
 */
export interface MiddlewareContext<ArgumentT> {
  /**
   * URI of the function passed to the middleware.
   */
  readonly uri: string;
  /**
   * Tenant identifier.
   */
  readonly tenantId: string;
  /**
   * Arguments used in the middleware function. You can change this property to change the arguments in function execution.
   */
  fnArgument: ArgumentT;
}

/**
 * Function around which the middlewares are added.
 */
export type MiddlewareFunction<ArgumentT, ReturnT> = (
  arg: ArgumentT
) => Promise<ReturnT>;

/**
 * Middleware type - This function takes some initial function and returns a function.
 * The input is the MiddlewareIn containing the initial function and some context information e.g. axios request and the request context.
 * It returns a new functions with some additional feature e.g. timeout.
 */
export type Middleware<
  ArgumentT,
  ReturnT,
  ContextT extends MiddlewareContext<ArgumentT>
> = (
  options: MiddlewareOptions<ArgumentT, ReturnT, ContextT>
) => MiddlewareFunction<ArgumentT, ReturnT>;

/**
 * Helper function to join a list of middlewares given an initial input.
 * @param middlewares - Middlewares to be layered around the function.
 * @param context - Context for the middleware execution.
 * @param fn - Function around which the middlewares are added.
 * @returns Function with middlewares layered around it.
 * @internal
 */
export function executeWithMiddleware<
  ArgumentT,
  ReturnT,
  ContextT extends MiddlewareContext<ArgumentT>
>(
  middlewares: Middleware<ArgumentT, ReturnT, ContextT>[] | undefined,
  context: ContextT,
  fn: MiddlewareFunction<ArgumentT, ReturnT>
): Promise<ReturnT> {
  if (!middlewares?.length) {
    return fn(context.fnArgument);
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
  return functionWithMiddlewares(context.fnArgument);
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
function addMiddlewaresToInitialFunction<
  ArgumentT,
  ReturnT,
  ContextT extends MiddlewareContext<ArgumentT>
>(
  middlewares: Middleware<ArgumentT, ReturnT, ContextT>[],
  initial: MiddlewareOptions<ArgumentT, ReturnT, ContextT>
): MiddlewareFunction<ArgumentT, ReturnT> {
  const { context, skipNext } = initial;

  const functionWithMiddlewares = middlewares.reduce((prev, curr) => {
    const middlewareAdded = skipNext.called ? prev.fn : curr(prev);
    return { fn: middlewareAdded, context, skipNext };
  }, initial);
  return functionWithMiddlewares.fn;
}
