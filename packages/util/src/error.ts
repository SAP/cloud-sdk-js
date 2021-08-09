import { unixEOL } from './string-formatter';

/**
 * @deprecated Since v1.34.0. Use [[ErrorWithCause]] instead.
 * Creates a new Error and adds the stack trace of the original error to the stack trace of the new one.
 * @param message - Error message.
 * @param cause - Original error, causing the new error.
 * @returns A new error with the given cause.
 */
export function errorWithCause(message: string, cause: Error): Error {
  const newError = new Error(message);
  // Stack is a non-standard property according to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
  if (newError.stack && cause.stack) {
    newError.stack =
      newError.stack + `${unixEOL}Caused by:${unixEOL}` + cause.stack;
  }
  return newError;
}
