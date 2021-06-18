/**
 * Same as pipe but for asynchronous functions:
 * asynvPipe(finc1,func2,...funcN)(start)  executes all functions in sequence awaiting the result and piping the response through in other words await funcN(... await func2(await func1(start))...)
 * @deprecated We will remove this in version 2.0 of the SDK.
 *
 * @param fns - a list of asynchronous functions to be executed in sequence
 * @param start - start value for the first function in the list
 * @returns the reponse of the last function in the list.
 */
export const asyncPipe =
  (...fns: CallableFunction[]) =>
  (start: any): Promise<any> =>
    fns.reduce(
      (state: Promise<any>, fn) => state.then(x => fn(x)),
      Promise.resolve(start)
    );

/**
 * Identity function
 * @param argument - Any object
 * @returns the given argument without doing something
 *
 */
export const identity = <T>(argument: T): T => argument;
