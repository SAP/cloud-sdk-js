import { EOL } from 'os';

/**
 * Represents an error that was caused by another error.
 */

export class ErrorWithCause extends Error {
  /**
   * Create an instance of ErrorWithCause.
   * @param message Error message.
   * @param cause Original error, causing this error.
   */
  constructor(message: string, public readonly cause: Error) {
    // There is an issue with the prototype chain when extending from Error: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = 'ErrorWithCause';

    // Stack is a non-standard property according to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
    if (this.stack && cause?.stack) {
      this.stack = `${this.stack}${EOL}Caused by:${EOL}${cause.stack}`;
    }
  }

  /**
   * Root cause of the error.
   * If there are multiple errors caused one by another, the root cause is the first error that occurred.
   * In case there is no root cause.
   */
  get rootCause(): Error {
    return isErrorWithCause(this.cause) ? this.cause.rootCause : this.cause;
  }
}
/**
 * Type guard to check whether an error is of type ErrorWithCause.
 * @param err An error.
 * @returns Whether the given error is of type ErrorWithCause.
 */

export function isErrorWithCause(err: Error): err is ErrorWithCause {
  return err?.name === 'ErrorWithCause';
}
