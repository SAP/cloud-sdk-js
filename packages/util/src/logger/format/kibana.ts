/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { format } from 'winston';

const { combine, timestamp, json } = format;

/**
 * Format for logging in Kibana.
 */
export const kibana = combine(
  timestamp(),
  format(info => ({
    ...info,
    msg: info.message,
    written_ts: new Date(info.timestamp).getTime(),
    written_at: info.timestamp
  }))(),
  json()
);
