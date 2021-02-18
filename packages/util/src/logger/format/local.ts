import chalk from 'chalk';
import { format } from 'winston';
import { TransformableInfo } from 'logform';

const { combine, timestamp, cli, printf } = format;

// This is a hack to ensure that error logging works in browsers. Necessary due to: https://github.com/winstonjs/logform/issues/97
// eslint-disable-next-line import/no-internal-modules
const errors = format.errors || require('logform/errors');
/**
 * Format for local logging.
 */
export const local = combine(
  errors({ stack: true }),
  timestamp(),
  format(localTransformer)(),
  cli(),
  printf(info => {
    const messageContext =
      info.custom_fields && info.custom_fields.messageContext
        ? `${chalk.blue(`(${info.custom_fields.messageContext})`)}: `
        : '';
    const trimmedMessage = info.message.replace(/^\s*/, '');
    const paddingLength =
      info.message.length - trimmedMessage.length + messageContext.length;
    if (info.error) {
      info.level = chalk.inverse(info.level);
    }
    return `${chalk.gray(`[${info.timestamp}]`)} ${
      info.level
    } ${messageContext.padStart(paddingLength, ' ')}${trimmedMessage}`;
  })
);
/**
 * @param info - object to be transformed.
 * @returns the message string to be used.
 * @hidden
 */
export function getMessageOrStack(info: TransformableInfo): string {
  return info.stack && info.level === 'error' ? info.stack : info.message;
}

function localTransformer(info: TransformableInfo): TransformableInfo {
  return {
    ...info,
    level: info.level.toUpperCase(),
    message: getMessageOrStack(info)
  };
}
