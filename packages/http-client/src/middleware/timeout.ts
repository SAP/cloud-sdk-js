import {
  Context,
  Middleware,
  MiddlewareIn,
  MiddlewareOut
} from './middleware-type';

const defaultTimeout = 10000;

/**
 * Helper method to build a timout middleware.
 * @param timeoutValue - Timeout in milliseconds. Default value are 10 seconds.
 * @returns The middleware adding a timeout to the function.
 */
export function timeout<ReturnType, ContextType extends Context>(
  timeoutValue: number = defaultTimeout
): Middleware<ReturnType, ContextType> {
  return function (
    options: MiddlewareIn<ReturnType, ContextType>,
    skip: boolean
  ): MiddlewareOut<ReturnType> {
    if (skip) {
      return options.fn;
    }
    const wrapped = () =>
      Promise.race([
        timeoutPromise<ReturnType>(timeoutValue, options.context.uri),
        options.fn()
      ]);
    return wrapped;
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
