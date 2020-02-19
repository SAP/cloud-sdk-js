/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import chalk from 'chalk';
import { format } from 'winston';

const { combine, timestamp, cli, printf } = format;

/**
 * Format for local logging.
 */
export const local = combine(
  timestamp(),
  format(info => ({
    ...info,
    level: info.level.toUpperCase()
  }))(),
  cli(),
  printf(info => {
    const messageContext = info.custom_fields && info.custom_fields.messageContext ? `${chalk.blue(`(${info.custom_fields.messageContext})`)}: ` : '';
    const trimmedMessage = info.message.replace(/^\s*/, '');
    const paddingLength = info.message.length - trimmedMessage.length + messageContext.length;
    if (info.error) {
      info.level = chalk.inverse(info.level);
    }
    return `${chalk.gray(`[${info.timestamp}]`)} ${info.level} ${messageContext.padStart(paddingLength, ' ')}${trimmedMessage}`;
  })
);
