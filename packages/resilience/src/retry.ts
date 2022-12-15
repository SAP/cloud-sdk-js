import { createLogger } from '@sap-cloud-sdk/util';
import * as asyncRetry from 'async-retry';
import { Context, Middleware, MiddlewareIn, MiddlewareOut } from './middleware';

const logger = createLogger({
  package: 'resilience',
  messageContext: 'retry'
});

const defaultRetryCount = 3;

/**
 * Helper method to build a retry middleware.
 * @param retryCount - Number of retry attempts. Default value is 3.
 * @returns The middleware adding a retry to the function.
 */
export function retry<ReturnType, ContextType extends Context>(
  retryCount: number = defaultRetryCount
): Middleware<ReturnType, ContextType> {
  return function (
    options: MiddlewareIn<ReturnType, ContextType>
  ): MiddlewareOut<ReturnType> {
    return () =>
      asyncRetry.default(
        async bail => {
          try {
            return await options.fn();
          } catch (error) {
            // Don't retry on error statuses where a second attempt won't help
            const status = error?.response?.status;
            if (!status) {
              logger.debug(
                'HTTP request failed but error did not contain a response status field as expected. Rethrowing error.'
              );
            }
            if (status === 401 || status === 403) {
              bail(new Error(`Request failed with status code ${status}`));
            }

            throw error;
          }
        },
        { retries: retryCount }
      );
  };
}
