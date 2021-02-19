import { format } from 'winston';
import { TransformableInfo } from 'logform';
import { getMessageOrStack } from './local';

const { combine, timestamp, json } = format;

// This is a hack to ensure that error logging works in browsers. Necessary due to: https://github.com/winstonjs/logform/issues/97
// eslint-disable-next-line import/no-internal-modules
const errors = format.errors || require('logform/errors');

/**
 * Format for logging in Kibana.
 */
export const kibana = combine(
  errors({ stack: true }),
  timestamp(),
  format(kibanaTransformer)(),
  json()
);

function kibanaTransformer(info: TransformableInfo): TransformableInfo {
  return {
    ...info,
    msg: getMessageOrStack(info),
    written_ts: new Date(info.timestamp).getTime(),
    written_at: info.timestamp
  };
}
