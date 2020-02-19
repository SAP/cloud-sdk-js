/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

/**
 * Creates a new error using the provided message and appends the causes stacktrace to the new error's stacktrace.
 *
 * @param message The message of the new error.
 * @param cause The original error.
 * @returns A new error instance.
 */
export function errorWithCause(message: string, cause: Error): Error {
  const newError = new Error(message);
  // stack is a non-standard property according to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
  if (newError.stack && cause.stack) {
    newError.stack = newError.stack + '\nCaused by:\n' + cause.stack;
  }
  return newError;
}
