import { createLogger } from '@sap-cloud-sdk/util';
import * as asyncRetry from 'async-retry';
import {
  MiddlewareContext,
  Middleware,
  MiddlewareOptions,
  MiddlewareFunction
} from './middleware';

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
export function retry<
  ArgumentType,
  ReturnType,
  ContextType extends MiddlewareContext<ArgumentType>
>(
  retryCount: number = defaultRetryCount
): Middleware<ArgumentType, ReturnType, ContextType> {
  if (retryCount < 0) {
    throw new Error('Retry count value is invalid.');
  }

  return function (
    options: MiddlewareOptions<ArgumentType, ReturnType, ContextType>
  ): MiddlewareFunction<ArgumentType, ReturnType> {
    return arg =>
      asyncRetry.default(
        async bail => {
          try {
            return await options.fn(arg);
          } catch (error) {
            // Don't retry on error statuses where a second attempt won't help
            const status = error?.response?.status;
            if (!status) {
              logger.debug(
                'HTTP request failed but error did not contain a response status field as expected. Rethrowing error.'
              );
            }
            if (status.toString().startsWith('4')) {
              bail(new Error(`Request failed with status code ${status}`));
              // We need to return something here but the actual value does not matter
              return undefined as ReturnType;
            }

            throw error;
          }
        },
        { retries: retryCount }
      );
  };
}
