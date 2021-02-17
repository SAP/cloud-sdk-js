import chalk from 'chalk';
import { format } from 'winston';

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
  format(info => {
    const adjusted = { ...info, level: info.level.toUpperCase() };

    if (info.level === 'error' && info.stack) {
      adjusted.message = info.stack;//the stack contains the message\nstack content
    }

    return adjusted;
  })(),
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
