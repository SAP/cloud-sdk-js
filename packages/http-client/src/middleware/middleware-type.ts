import type { Destination } from '@sap-cloud-sdk/connectivity';
import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('middleware');

/**
 * In/out parameter in the chain of middlewares.
 */
export interface MiddlewareInOut<T> {
  /**
   * Function execute inside the middleware.
   */
  fn: () => Promise<T>;
  /**
   * Context of the execution.
   */
  context: Context;
}

/**
 * Middleware type.
 */
export type Middleware<T> = (options: MiddlewareInOut<T>) => MiddlewareInOut<T>;

/**
 * Context of the middleware.
 */
export interface Context {
  /**
   * Request category.
   */
  category: 'xsuaa' | 'destination' | 'user-defined';
  /**
   * Destination used in the request.
   */
  destination: Destination;
  /**
   * JWT used in the request.
   */
  jwt?: string;
  /**
   * Arguments used in the request.
   */
  args: any[];
}

/**
 * Helper function to join a list of middlewares given an initial input.
 * @param middleWares - Middlewares to be layered around the function.
 * @param initial - Input for the layering process.
 * @returns Function with middles wares layered around it.
 */
export function wrapFunctionWithMiddleware<T>(
  middleWares: Middleware<T>[] | undefined,
  initial: MiddlewareInOut<T>
): () => Promise<T> {
  if (!middleWares || middleWares.length === 0) {
    return initial.fn;
  }
  const functionWithMiddlware = middleWares.reduce<MiddlewareInOut<T>>(
    (prev, curr) => curr(prev),
    initial
  );
  return functionWithMiddlware.fn;
}
