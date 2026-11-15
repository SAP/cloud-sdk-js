import { format } from 'winston';
import { getMessageOrStack } from './local';
import type { TransformableInfo } from 'logform';

const { combine, timestamp, json, errors } = format;

/**
 * Format for logging in Kibana.
 */
export const kibana = combine(
  errors({ stack: true }),
  timestamp(),
  format(kibanaTransformer)(),
  json()
);

/**
 * Transforms given info into Kibana-compatible format.
 * @param info Info that is to be transformed.
 * @returns Info in Kibana-compatible format. 
 */
function kibanaTransformer(info: TransformableInfo): TransformableInfo {
  return {
    ...info,
    msg: getMessageOrStack(info),
    written_ts: new Date(info.timestamp as string).getTime(),
    written_at: info.timestamp
  };
}
