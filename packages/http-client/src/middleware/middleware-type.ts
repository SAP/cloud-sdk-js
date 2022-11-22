import type { Destination } from '@sap-cloud-sdk/connectivity';
import { createLogger } from '@sap-cloud-sdk/util';
import { HttpRequestConfig } from '../http-client-types';

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
   * Request config.
   */
  requestConfig?: HttpRequestConfig;
  /**
   * Arguments used in the request.
   */
  args: any[];
}

/**
 * Helper function to join a list of middlewares given an initial input.
 * @param middlewares - Middlewares to be layered around the function.
 * @param initial - Input for the layering process.
 * @returns Function with middles wares layered around it.
 * @internal
 */
export function executeWithMiddleware<T>(
  middlewares: Middleware<T>[] | undefined,
  initial: MiddlewareInOut<T>
): Promise<T> {
  if (!middlewares || middlewares.length === 0) {
    return initial.fn();
  }
  const functionWithMiddlware = middlewares.reduce<MiddlewareInOut<T>>(
    (prev, curr) => curr(prev),
    initial
  );
  return functionWithMiddlware.fn();
}
