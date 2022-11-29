import { Context, Middleware, MiddlewareInOut } from './middleware-type';

const defaultTimeout = 10000;

/**
 * Helper method to build a timout middleware.
 * @param timeoutValue - Timeout in milliseconds default value are 10 seconds.
 * @returns The middleware adding a timeout.
 */
export function timeout<ReturnType, ContextType extends Context>(
  timeoutValue: number = defaultTimeout
): Middleware<ReturnType, ContextType> {
  return function (
    options: MiddlewareInOut<ReturnType, ContextType>
  ): MiddlewareInOut<ReturnType, ContextType> {
    if (options.exitChain) {
      return options;
    }
    const wrapped = () =>
      Promise.race([
        timeoutPromise<ReturnType>(timeoutValue, options.context.uri),
        options.fn()
      ]);
    return {
      ...options,
      fn: wrapped
    };
  };
}

function timeoutPromise<ReturnType>(
  timeoutValue: number,
  uri: string
): Promise<ReturnType> {
  return new Promise<ReturnType>((resolve, reject) =>
    setTimeout(
      () =>
        reject(
          new Error(
            `Request to ${uri} ran into timeout after ${timeoutValue}ms.`
          )
        ),
      timeoutValue
    )
  );
}
