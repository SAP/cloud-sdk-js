/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { format } from 'winston';

const { combine, timestamp, json, errors } = format;

/**
 * Format for logging in Kibana.
 */
export const kibana = combine(
  errors({ stack: true }),
  timestamp(),
  format(info => ({
    ...info,
    msg: info.message,
    written_ts: new Date(info.timestamp).getTime(),
    written_at: info.timestamp
  }))(),
  json()
);
