import chalk from 'chalk';
import { format } from 'winston';
import type { TransformableInfo } from 'logform';

const { combine, timestamp, cli, printf, errors } = format;

/**
 * Format for local logging.
 */
export const local = combine(
  errors({ stack: true }),
  timestamp(),
  format(localTransformer)(),
  cli(),
  printf((info: TransformableInfo) => {
    // Ensure custom_fields is an object and has messageContext
    const messageContext =
      info.custom_fields &&
      typeof info.custom_fields === 'object' &&
      'messageContext' in info.custom_fields
        ? `${chalk.blue(`(${info.custom_fields.messageContext})`)}: `
        : '';
    // Type guard to ensure message is a string
    const message = typeof info.message === 'string' ? info.message : '';
    const trimmedMessage = message.replace(/^\s*/, '');
    const paddingLength =
      message.length - trimmedMessage.length + messageContext.length;
    if (info.error) {
      info.level = chalk.inverse(info.level);
    }
    return `${chalk.gray(`[${info.timestamp}]`)} ${
      info.level
    } ${messageContext.padStart(paddingLength, ' ')}${trimmedMessage}`;
  })
);
/**
 * Gets the stack of the given error if available, otherwise the message.
 * @param info - Object to be transformed.
 * @returns The message string to be used.
 * @internal
 */
export function getMessageOrStack(info: TransformableInfo): string {
  const isString = (value: unknown): value is string =>
    typeof value === 'string';
  // Check if it's an error with a stack trace
  const hasStackTrace = info.stack && info.level === 'error';

  if (hasStackTrace && isString(info.stack)) {
    return info.stack;
  }

  if (isString(info.message)) {
    return info.message;
  }

  return '';
}

function localTransformer(info: TransformableInfo): TransformableInfo {
  return {
    ...info,
    level: info.level.toUpperCase(),
    message: getMessageOrStack(info)
  };
}
