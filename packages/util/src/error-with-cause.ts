import { AxiosError } from 'axios';
import { unixEOL } from './string-formatter';

/**
 * Represents an error that was caused by another error.
 */
export class ErrorWithCause extends Error {
  /**
   * Create an instance of ErrorWithCause.
   * @param message - Error message.
   * @param cause - Original error, causing this error.
   */
  constructor(message: string, public readonly cause: Error) {
    // There is an issue with the prototype chain when extending from Error: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = 'ErrorWithCause';

    this.addStack(cause);
  }

  private isAxiosError(err: Error | AxiosError): err is AxiosError {
    return err['isAxiosError'] === true;
  }

  private addStack(cause: Error) {
    // Axios removed the stack property in version 0.27 which gave no useful information anyway. This adds the http cause.
    if (this.isAxiosError(cause)) {
      const response = cause.response?.data ? ` - ${cause.response?.data}` : '';
      this.stack = `${this.stack}${unixEOL}Caused by:${unixEOL}HTTP Response: ${cause.message}${response}`;
    } else if (this.stack && cause?.stack) {
      // Stack is a non-standard property according to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
      this.stack = `${this.stack}${unixEOL}Caused by:${unixEOL}${cause.stack}`;
    }
  }
  /**
   * Root cause of the error.
   * If there are multiple errors caused one by another, the root cause is the first error that occurred.
   * In case there is no root cause.
   * @returns The root cause.
   */
  get rootCause(): Error {
    return isErrorWithCause(this.cause) ? this.cause.rootCause : this.cause;
  }
}
/**
 * Type guard to check whether an error is of type ErrorWithCause.
 * @param err - An error.
 * @returns Whether the given error is of type ErrorWithCause.
 */
export function isErrorWithCause(err: Error): err is ErrorWithCause {
  return err?.name === 'ErrorWithCause';
}
