import { createLogger } from '@sap-cloud-sdk/util';
import { Context, Middleware, MiddlewareIn, MiddlewareOut } from './middleware';

const defaultTimeout = 10000;

const logger = createLogger({
  package: 'resilience',
  messageContext: 'timeout'
});

/**
 * Helper method to build a timeout middleware.
 * @param timeoutValue - Timeout in milliseconds. Default value is 10000.
 * @returns The middleware adding a timeout to the function.
 */
export function timeout<ReturnType, ContextType extends Context>(
  timeoutValue: number = defaultTimeout
): Middleware<ReturnType, ContextType> {
  if (timeoutValue <= 0) {
    throw new Error('Timeout value is invalid.');
  }
  if (timeoutValue < 10) {
    logger.warn(
      `The timeout of ${timeoutValue} ms is too low. Make sure this is not intentional.`
    );
  }
  return function (
    options: MiddlewareIn<ReturnType, ContextType>
  ): MiddlewareOut<ReturnType> {
    const message = `Request to URL: ${options.context.uri} ran into a timeout after ${timeoutValue}ms.`;
    return () => wrapInTimeout(options.fn(), timeoutValue, message);
  };
}

/**
 * Creates a promise for a timeout race.
 * @internal
 * @param timeoutValue - Value for the timeout in milliseconds.
 * message: string - Error message thrown when timeout is exceeded.
 * @returns A promise which times out after the given time and the node timout instance to clear the timeout if not needed anymore.
 */
function getTimeoutPromise<T>(
  timeoutValue: number,
  message: string
): [Promise<T>, NodeJS.Timeout | undefined] {
  let timeoutNode: NodeJS.Timeout | undefined;
  const promise = new Promise<T>((resolve, reject) => {
    timeoutNode = setTimeout(() => reject(new Error(message)), timeoutValue);
  });
  return [promise, timeoutNode];
}

/**
 * @param promise - Promise
 * @param timeoutValue - Value for the timeout in milliseconds.
 * @internal
 */
async function wrapInTimeout<T>(
  promise: Promise<T>,
  timeoutValue: number,
  message: string
): Promise<T> {
  const [timeoutPromise, timeoutInstance] = getTimeoutPromise<T>(
    timeoutValue,
    message
  );
  // Clear the timeout if the original promise is resolve or reject to avoid open handlers.
  const withClearTimeout = promise.finally(() => {
    clearTimeout(timeoutInstance);
  });

  return Promise.race([withClearTimeout, timeoutPromise]);
}
