export function errorWithCause(message: string, cause: Error): Error {
  const newError = new Error(message);
  // Stack is a non-standard property according to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
  if (newError.stack && cause.stack) {
    newError.stack = newError.stack + '\nCaused by:\n' + cause.stack;
  }
  return newError;
}

export class ErrorWithCause extends Error {
  constructor(message: string, public cause?: Error) {
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = 'ErrorWithCause';

    // Stack is a non-standard property according to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
    if (this.stack && cause?.stack) {
      this.stack = this.stack + '\nCaused by:\n' + cause.stack;
    }
  }

  get rootCause(): Error {
    return isErrorWithCause(this.cause) ? this.cause.rootCause : this.cause || this;
  }
}

export function isErrorWithCause(err: Error | undefined): err is ErrorWithCause {
  return err?.name === 'ErrorWithCause';
}
