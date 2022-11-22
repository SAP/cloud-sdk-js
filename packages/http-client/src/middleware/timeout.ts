import { Context, Middleware, MiddlewareInOut } from './middleware-type';

const defaultTimeout = 10000;

/**
 * Helper method to build a timout middleware.
 * @internal
 * @param timeoutValue - in miliseconds
 */
export function timeout<ReturnType, ContextType extends Context>(
  timeoutValue: number = defaultTimeout
): Middleware<ReturnType, ContextType> {
  return function (
    options: MiddlewareInOut<ReturnType, ContextType>
  ): MiddlewareInOut<ReturnType, ContextType> {
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
