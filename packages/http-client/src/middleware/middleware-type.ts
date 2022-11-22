import { createLogger } from '@sap-cloud-sdk/util';
import { HttpRequestConfig } from '../http-client-types';

const logger = createLogger('middleware');

/**
 * In/out parameter in the chain of middlewares.
 */
export interface MiddlewareInOut<ReturnType, ContextType extends Context> {
  /**
   * Function execute inside the middleware.
   */
  fn: () => Promise<ReturnType>;
  /**
   * Context of the execution.
   */
  context: ContextType;
}

/**
 * Minimal Context of the middleware.
 */
export interface Context {
  /**
   * Arguments used in the request.
   */
  args: any[];
  /**
   * URI of the request wrapped in the middleware.
   */
  uri: string;
}

/**
 * Middleware type.
 */
export type Middleware<ReturnType, ContextType extends Context> = (
  options: MiddlewareInOut<ReturnType, ContextType>
) => MiddlewareInOut<ReturnType, ContextType>;

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
 * @param initial - Input for the layering process.
 * @returns Function with middles wares layered around it.
 * @internal
 */
export function executeWithMiddleware<ReturnType, ContextType extends Context>(
  middlewares: Middleware<ReturnType, ContextType>[] | undefined,
  initial: MiddlewareInOut<ReturnType, ContextType>
): Promise<ReturnType> {
  if (!middlewares || middlewares.length === 0) {
    return initial.fn();
  }
  const functionWithMiddlware = middlewares.reduce<
    MiddlewareInOut<ReturnType, ContextType>
  >((prev, curr) => curr(prev), initial);
  return functionWithMiddlware.fn();
}
