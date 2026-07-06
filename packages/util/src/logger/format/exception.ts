import { format } from 'winston';
import type { TransformableInfo } from 'logform';

const { combine, timestamp, json, errors } = format;

/**
 * Fields the exception logger is allowed to emit. Everything else
 * is dropped before serialization to prevent potentially sensitive data
 * from being logged when an uncaught exception is handled.
 */
const safeKeys = [
  'level',
  'timestamp',
  'logger',
  'name',
  'message',
  'stack'
] as const;

function pickSafeFields(info: TransformableInfo): TransformableInfo {
  const safe: Record<string, unknown> = {};
  for (const key of safeKeys) {
    if (info.hasOwnProperty(key)) {
      safe[key] = info[key];
    }
  }
  // Winston sometimes exposes the original Error under `info.error` when using
  // `errors({ stack: true })`. Fall back to its name if the top-level name is
  // missing (never copy the whole error — that's the leak we're preventing).
  if (safe.name === undefined && (info as any).error?.name) {
    safe.name = (info as any).error.name;
  }
  return safe as TransformableInfo;
}

/**
 * Format that drops all fields except for a fixed allow-list of safe fields.
 * Used by the default exception logger to avoid logging sensitive information
 * from the underlying error (e.g. AxiosError.config).
 */
export const pickSafeErrorFieldsFormat = format(pickSafeFields)();

/**
 * Format used exclusively by the default exception logger. Emits only a fixed
 * allow-list of fields (`name`, `message`, `stack`, plus winston metadata) so
 * that enumerable properties of an `AxiosError` cannot leak sensitive request
 * or response headers into the uncaught-exception output.
 * @internal
 */
export const exceptionFormat = combine(
  errors({ stack: true }),
  timestamp(),
  pickSafeErrorFieldsFormat,
  json()
);
