import { Middleware, MiddlewareInOut } from './middleware-type';

const defaultTimeout = 10000;

/**
 * Helper method to build a timout middleware.
 * @internal
 * @param timeoutValue - in miliseconds
 */
export function timeout<T>(
  timeoutValue: number = defaultTimeout
): Middleware<T> {
  return function (options: MiddlewareInOut<T>): MiddlewareInOut<T> {
    const url = options.context?.destination.url;
    const wrapped = () =>
      Promise.race([timeoutPromise<T>(timeoutValue, url), options.fn()]);
    return {
      ...options,
      fn: wrapped
    };
  };
}

function timeoutPromise<T>(timeoutValue: number, url: string): Promise<T> {
  return new Promise<T>((resolve, reject) =>
    setTimeout(
      () =>
        reject(
          new Error(
            `Request to ${url} ran into timeout after ${timeoutValue}ms.`
          )
        ),
      timeoutValue
    )
  );
}
