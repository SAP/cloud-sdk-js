/**
 * Same as pipe but for asynchronous functions:
 * `asyncPipe(func1, func2, ...funcN)(start)` executes all functions in sequence awaiting the result and piping the response through in other words `await funcN(... await func2(await func1(start))...)`.
 * @deprecated We will remove this in version 2.0 of the SDK.
 * @param fns - A list of asynchronous functions to be executed in sequence.
 * @param start - Start value for the first function in the list.
 * @returns The return value of the last function in the list.
 */
export const asyncPipe =
  (...fns: CallableFunction[]) =>
  (start: any): Promise<any> =>
    fns.reduce(
      (state: Promise<any>, fn) => state.then(x => fn(x)),
      Promise.resolve(start)
    );

/**
 * Identity function.
 * @param value - Any value.
 * @returns The given value.
 */
export function identity<T>(value: T): T {
  return value;
}
