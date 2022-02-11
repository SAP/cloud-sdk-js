import {
  Container,
  Logger,
  LoggerOptions as WinstonLoggerOptions,
  transports
} from 'winston';
import { kibana, local } from './format';

const format = process.env.VCAP_SERVICES ? kibana : local;
const loggerReference = 'sap-cloud-sdk-logger';
const exceptionLoggerId = 'sap-cloud-sdk-exception-logger';

const container = new Container();
const exceptionTransport = new transports.Console();
const customLogLevels = {};
const DEFAULT_LOGGER__MESSAGE_CONTEXT = '__DEFAULT_LOGGER__MESSAGE_CONTEXT';
let silent = false;

const moduleLogger = createLogger({
  package: 'util',
  messageContext: 'cloud-sdk-logger'
});

function toggleMuteLoggers(silence: boolean) {
  silent = silence;
  container.loggers.forEach(logger => toggleSilenceTransports(logger, silence));
}

function toggleSilenceTransports(logger: Logger, silence: boolean) {
  logger.transports.forEach(transport => (transport.silent = silence));
}

/**
 * Mute all logger output created by the SAP Cloud SDK Logger. This also applies to future loggers created. Useful for tests.
 */
export function muteLoggers(): void {
  toggleMuteLoggers(true);
}

/**
 * Unmute all logger output created by the SAP Cloud SDK Logger. This also applies to future loggers created. Useful for tests.
 */
export function unmuteLoggers(): void {
  toggleMuteLoggers(false);
}

/**
 * Default logger for the SAP Cloud SDK for unhandled exceptions.
 */
export const cloudSdkExceptionLogger = container.get(exceptionLoggerId, {
  defaultMeta: { logger: loggerReference, test: 'exception' },
  format,
  exceptionHandlers: [exceptionTransport]
});

/**
 * Disable logging of exceptions. Enabled by default.
 */
export function disableExceptionLogger(): void {
  cloudSdkExceptionLogger.exceptions.unhandle();
}

/**
 * Enable logging of exceptions. Enabled by default.
 */
export function enableExceptionLogger(): void {
  // Flush all possible handlers to make sure there is only one in the end.
  disableExceptionLogger();
  cloudSdkExceptionLogger.exceptions.handle(exceptionTransport);
}

/**
 * Create a logger for the given message context, if available.
 *
 * Usage:
 * To create a logger in your module, it is recommended to pass a module identifier that will be logged as `messageContext` for all messages from this logger:
 * `const logger = createLogger('my-module');`. Not setting any module identifier will retrieve the default logger.
 * Use this logger throughout your module. If the module is spread over multiple files, you can retrieve the logger instance by calling the `createLogger` function with the respective module identifier.
 * There will always be only one instance of a logger per module identifier.
 * You can pass any custom data that you want to be logged in addition by passing an object instead. You can change the default logging level (`INFO`) using the `level` key in the object.
 * In those cases, provide the `messageContext` as a key in the object:
 * ```
 * const logger = createLogger({
 *   messageContext: 'my-module',
 *   myCustomKey: 'my-custom-data',
 *   level: 'debug'
 * });
 * ```
 * You will find these information under the _custom_fields_ key in your Cloud Foundry logs.
 *
 * To retrieve a logger after its creation use [[getLogger]].
 * If you want to change the log level of a logger use [[setLogLevel]].
 * @param messageContext - Either a key for the message context of all messages produced by the logger or an object with additional keys to set in the message.
 * @returns A newly created or an already existing logger for the given context.
 */
export function createLogger(
  messageContext?: string | (MessageContextObj & LoggerOptions)
): Logger {
  const customFields: { [key: string]: any } =
    typeof messageContext === 'string'
      ? { messageContext }
      : { ...messageContext };
  const logger = container.get(customFields.messageContext, {
    level:
      customLogLevels[customFields.messageContext] ||
      customFields.level ||
      container.options.level ||
      'info',
    defaultMeta: {
      ...(Object.entries(customFields).length && {
        custom_fields: customFields
      }),
      logger: customFields.logger || loggerReference
    },
    format,
    transports: [new transports.Console()]
  });

  toggleSilenceTransports(logger, silent);

  return logger;
}

/**
 * Get logger for a given message context, if available.
 * @param messageContext - A key for the message context of all messages produced by the logger
 * @returns The logger for the given messageContext if it was created before
 */
export function getLogger(
  messageContext = DEFAULT_LOGGER__MESSAGE_CONTEXT
): Logger | undefined {
  if (container.has(messageContext)) {
    return container.get(messageContext);
  }
}

/**
 * Change the log level of a logger based on its message context.
 * E. g., to set the log level for the destination accessor module of the SDK to _debug_, simply call `setLogLevel('debug', 'destination-accessor')`.
 * @param level - level to set the logger to. Use an empty string '' as level to unset context level.
 * @param messageContextOrLogger - Message context of the logger to change the log level for or the logger itself
 */
export function setLogLevel(
  level: LogLevel | '',
  messageContextOrLogger: string | Logger = DEFAULT_LOGGER__MESSAGE_CONTEXT
): void {
  const messageContext =
    typeof messageContextOrLogger === 'string'
      ? messageContextOrLogger
      : getMessageContext(messageContextOrLogger);

  if (messageContext) {
    customLogLevels[messageContext] = level;

    if (container.has(messageContext)) {
      const logger = container.get(messageContext);
      logger.level = level;
    }
  } else if (typeof messageContextOrLogger !== 'string') {
    moduleLogger.warn(
      'Setting log level for logger with unknown message context'
    );
    messageContextOrLogger.level = level;
  }
}

/**
 * Change the global log level of the container which will set default level for all active loggers.
 * E. g., to set the global log level call `setGlobalLogLevel('debug')`.
 * @param level - The log level to set the global log level to.
 */
export function setGlobalLogLevel(level: LogLevel): void {
  container.options.level = level;
  // Update existing loggers' log level with global level.
  container.loggers.forEach(logger => {
    logger.level = level;
  });
}

export function getGlobalLogLevel(): string | undefined {
  return container.options.level;
}

const defaultSensitiveKeys = [
  'access_token',
  'authentication',
  'authorization',
  'apiKey',
  'credentials',
  'csrf',
  'xsrf',
  'secret',
  'password',
  'JTENANT',
  'JSESSION'
];

/**
 * Check if the input key contains or matches any of the sensitive keys
 * @param inputKey - Key of the record to be sanitized
 * @param value - Value corresponding to the inputKey
 * @param sensitiveKeys - List of keys to be matched
 * @returns A boolean to indicate if the key contains or matches any sensitive key
 */
function isSensitive(
  inputKey: string,
  value: any,
  sensitiveKeys: string[]
): boolean {
  const normalizedKeys = sensitiveKeys.map(key => key.toLowerCase());
  const input = isCookieHeader(inputKey, value) ? inputKey : value;
  return normalizedKeys.some(normalizedKey =>
    input.toLowerCase().includes(normalizedKey)
  );
}

function isCookieHeader(inputKey: string, value: any): boolean {
  return inputKey.toLowerCase() === 'cookie' && typeof value === 'string';
}

/**
 * Potentially sensitive keys will be matched case-insensitive and as substrings.
 * Matches will be replaced with a placeholder string.
 * @param input - The record to be sanitized.
 * @param replacementString - The placeholder string.
 * @param sensitiveKeys - The list of keys to be replaced. This overrides the default list.
 * @returns The sanitized copy of the input record.
 */
export function sanitizeRecord<T = any>(
  input: Record<string, T>,
  replacementString = '<DATA NOT LOGGED TO PREVENT LEAKING SENSITIVE DATA>',
  sensitiveKeys: string[] = defaultSensitiveKeys
): Record<string, T> {
  return Object.fromEntries(
    Object.entries(input).map(([inputKey, value]) =>
      isSensitive(inputKey, value, sensitiveKeys)
        ? [inputKey, replacementString]
        : [inputKey, value]
    )
  );
}

function getMessageContext(logger: Logger): string | undefined {
  // This is a workaround for the missing defaultMeta property on the winston logger.
  const loggerOptions = logger as WinstonLoggerOptions;
  if (
    loggerOptions &&
    loggerOptions.defaultMeta &&
    loggerOptions.defaultMeta.custom_fields
  ) {
    return loggerOptions.defaultMeta.custom_fields.messageContext;
  }
}

/**
 * Npm log levels used for the SAP Cloud SDK logger.
 */
export type LogLevel =
  | 'error'
  | 'warn'
  | 'info'
  | 'verbose'
  | 'debug'
  | 'silly';

/**
 * Configurable logger options.
 */
export interface LoggerOptions {
  level?: LogLevel;
  logger?: string;
}

/**
 * Log message context for a logger with additional custom data.
 */
export interface MessageContextObj {
  messageContext?: string;
  [key: string]: any;
}
