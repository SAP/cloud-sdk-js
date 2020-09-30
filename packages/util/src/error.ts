export function errorWithCause(message: string, cause: Error): Error {
  const newError = new Error(message);
  // Stack is a non-standard property according to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
  if (newError.stack && cause.stack) {
    newError.stack = newError.stack + '\nCaused by:\n' + cause.stack;
  }
  return newError;
}
