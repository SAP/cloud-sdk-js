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
}

/**
 * Function around which the middlewares are added.
 */
export type MiddlewareFunction<ArgumentT, ReturnT> = (
  arg: ArgumentT
) => Promise<ReturnT>;

/**
 * Middleware type - This function takes some initial function and returns a function.
 * The input containing the initial function and some context information e.g. axios request and the request context.
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
  {
    fn,
    context,
    fnArgument
  }: MiddlewareOptions<ArgumentT, ReturnT, ContextT> & {
    fnArgument: ArgumentT;
  }
): Promise<ReturnT> {
  if (!middlewares?.length) {
    return fn(fnArgument);
  }

  const initial = { context, fn };
  const functionWithMiddlewares = addMiddlewaresToInitialFunction(
    middlewares,
    initial
  );
  return functionWithMiddlewares(fnArgument);
}

/**
 * This functions adds the middlewares to the initial functions.
 * You start with a function (axios request function) and add a timeout, circuit-breaker etc..
 * The result is new a function containing a timeout, circuit-breaker etc..
 * Note that the actual function is not executed.
 * @param middlewares - Middlewares added to the function. Added from right to function.
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
  const { context } = initial;

  // Reduce right is in line with the composition operator [g,f] relates g o f means g after f.
  const functionWithMiddlewares = middlewares.reduceRight(
    (prev, curr) => ({ fn: curr(prev), context }),
    initial
  );
  return functionWithMiddlewares.fn;
}
