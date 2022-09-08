import * as path from 'path';
import * as fs from 'fs';
import { transports } from 'winston';
import mock from 'mock-fs';
import {
  cloudSdkExceptionLogger,
  createLogger,
  disableExceptionLogger,
  enableExceptionLogger,
  getGlobalLogFormat,
  getGlobalLogLevel,
  getLogger,
  logFormat,
  muteLoggers,
  resetCustomLogFormats,
  resetCustomLogLevels,
  sanitizeRecord,
  setGlobalLogFormat,
  setGlobalLogLevel,
  setGlobalTransports,
  setLogFormat,
  setLogLevel,
  unmuteLoggers
} from './cloud-sdk-logger';
import { getMessageOrStack } from './format';

describe('Cloud SDK Logger', () => {
  const messageContext = 'my-module';
  const message = 'MESSAGE';
  let logger;

  afterEach(() => {
    if (logger) {
      logger.close();
    }
    setLogLevel('', messageContext);
    setGlobalLogFormat(logFormat.local);
    resetCustomLogLevels();
    resetCustomLogFormats();
  });

  describe('createLogger', () => {
    beforeEach(() => {
      process.env.VCAP_SERVICES = 'exists';
    });

    afterEach(() => {
      delete process.env.VCAP_SERVICES;
    });

    it('creates a new default logger', () => {
      logger = createLogger();
      expect(logger).not.toBeUndefined();
    });

    it('creates a new logger for a module', () => {
      logger = createLogger(messageContext);
      expect(logger).not.toBeUndefined();
    });

    it('does not write higher log levels', () => {
      logger = createLogger({
        messageContext
      });
      const write = spyOnWrite(logger);

      logger.silly(message);

      expect(write).not.toHaveBeenCalled();
    });

    it('writes message context for a module', () => {
      logger = createLogger(messageContext);
      const write = spyOnWrite(logger);

      logger.info(message);

      expect(write).toHaveBeenCalledWith(
        expect.objectContaining({
          custom_fields: {
            messageContext
          },
          message: expect.stringContaining(message)
        }),
        expect.anything()
      );
    });

    it('changes default level', () => {
      logger = createLogger({
        messageContext,
        level: 'silly'
      });

      const write = spyOnWrite(logger);

      logger.silly(message);

      expect(write).toHaveBeenCalled();
    });

    it('changes logger name', () => {
      const loggerName = 'Kevin';
      logger = createLogger({
        messageContext,
        logger: loggerName
      });
      const write = spyOnWrite(logger);

      logger.info(message);

      expect(write).toHaveBeenLastCalledWith(
        expect.objectContaining({
          logger: loggerName
        }),
        expect.anything()
      );
    });
  });

  describe('logger configuration', () => {
    it('updates log level', () => {
      logger = createLogger(messageContext);
      logger.level = 'error';
      const write = spyOnWrite(logger);

      logger.info(message);

      expect(write).not.toHaveBeenCalled();
    });
  });

  describe('exception handling', () => {
    it('logs uncaught exceptions by default', () => {
      expect(cloudSdkExceptionLogger.exceptions.handlers.size).toBe(1);
      expect(cloudSdkExceptionLogger.exceptions.catcher).toBeTruthy();
    });

    it('disables logging of uncaught exceptions', () => {
      disableExceptionLogger();
      expect(cloudSdkExceptionLogger.exceptions.catcher).toBeFalsy();
    });

    it('enables logging of uncaught exceptions only once', () => {
      enableExceptionLogger();
      enableExceptionLogger();
      expect(cloudSdkExceptionLogger.exceptions.catcher).toBeTruthy();
    });

    it('uses stack if possible for errors', () => {
      expect(
        getMessageOrStack({ level: 'error', message: 'msg', stack: 'stack' })
      ).toBe('stack');
      expect(getMessageOrStack({ level: 'error', message: 'msg' })).toBe('msg');
    });

    it('uses message for non error cases', () => {
      expect(
        getMessageOrStack({
          level: 'not-error',
          message: 'msg',
          stack: 'stack'
        })
      ).toBe('msg');
    });
  });

  describe('get logger', () => {
    it('should be undefined before creation', () => {
      expect(getLogger(messageContext)).toBeUndefined();
    });

    it('should be a logger after creation', () => {
      logger = createLogger({
        package: 'some-package',
        messageContext
      });
      expect(getLogger(messageContext)).toBe(logger);
    });
  });

  describe('get message when passing error objects', () => {
    it('should show correct message', () => {
      logger = createLogger(messageContext);
      logger.level = 'error';
      const write = spyOnWrite(logger);

      logger.error(new Error(message));

      expect(write).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining(message)
        }),
        expect.anything()
      );
    });
  });

  describe('set log level', () => {
    const level = 'silly';

    it('should set the log level on creation before creating a logger', () => {
      setLogLevel(level, messageContext);
      logger = createLogger(messageContext);
      expect(logger.level).toEqual(level);
    });

    it('should set the log level with messageContext after creating a logger', () => {
      logger = createLogger(messageContext);
      setLogLevel(level, messageContext);
      expect(logger.level).toEqual(level);
    });

    it('should set the log level with logger after creating a logger', () => {
      logger = createLogger(messageContext);
      setLogLevel(level, logger);
      expect(logger.level).toEqual(level);
    });
  });

  describe('set global log level', () => {
    const level = 'error';

    beforeEach(() => {
      setGlobalLogLevel(level);
    });

    it('global log level getter and setter work', () => {
      expect(getGlobalLogLevel()).toEqual(level);
    });

    it('should have the global log level, if not applied a more specific level', () => {
      logger = createLogger(messageContext);

      expect(logger.level).toEqual(getGlobalLogLevel());
    });

    it('should have the log level, if applied a more specific level after creation', () => {
      logger = createLogger(messageContext);
      setLogLevel('warn', messageContext);

      expect(logger.level).toEqual('warn');
    });

    it('should have the log level, if applied a more specific level before creation', () => {
      setLogLevel('warn', messageContext);
      logger = createLogger(messageContext);

      expect(logger.level).toEqual('warn');
    });
  });

  describe('set global transport', () => {
    beforeEach(() => {
      logger = createLogger(messageContext);
    });
    it('should replace all transports in all active loggers with the global transport', async () => {
      const consoleSpy = jest.spyOn(process.stdout, 'write');
      const rootNodeModules = path.resolve(
        __dirname,
        '../../../../node_modules'
      );
      mock({
        'test.log': 'content',
        [rootNodeModules]: mock.load(rootNodeModules)
      });
      const fileTransport = new transports.File({
        filename: 'test.log',
        level: 'info'
      });
      const defaultLogger = getLogger('cloud-sdk-logger');
      const defaultExceptionLogger = getLogger(
        'sap-cloud-sdk-exception-logger'
      );

      setGlobalTransports(fileTransport);
      expect(logger?.transports).toHaveLength(1);
      expect(logger?.transports).toContainEqual(fileTransport);
      expect(defaultLogger?.transports).toHaveLength(1);
      expect(defaultLogger?.transports).toContainEqual(fileTransport);
      expect(defaultExceptionLogger?.transports).toHaveLength(1);
      expect(defaultExceptionLogger?.transports).toContainEqual(fileTransport);

      logger.error(
        'logs error only in test.log because the level is less than info'
      );
      logger.info(
        'logs info only in test.log because the level is equal to info'
      );
      logger.verbose(
        'logs verbose nowhere because the level is higher than info'
      );
      expect(consoleSpy).not.toBeCalled();
      const log = await fs.promises.readFile('test.log', { encoding: 'utf-8' });
      expect(log).toMatch(
        /logs error only in test.log because the level is less than info/
      );
      expect(log).toMatch(
        /logs info only in test.log because the level is equal to info/
      );
      expect(log).not.toMatch(
        /logs verbose nowhere because the level is higher than info/
      );
      mock.restore();
    });
    it('should accept an array with multiple transports', () => {
      const httpTransport = new transports.Http();
      const streamTransport = new transports.Console();
      setGlobalTransports([httpTransport, streamTransport]);
      expect(logger?.transports).toHaveLength(2);
    });
  });

  describe('set log format', () => {
    it('should set the log format on creation before creating a logger', () => {
      setLogFormat(logFormat.kibana, messageContext);
      logger = createLogger(messageContext);
      expect(logger.format).toEqual(logFormat.kibana);
    });

    it('should set the log format with messageContext after creating a logger', () => {
      logger = createLogger(messageContext);
      setLogFormat(logFormat.kibana, messageContext);
      expect(logger.format).toEqual(logFormat.kibana);
    });

    it('should set the log format with logger after creating a logger', () => {
      logger = createLogger(messageContext);
      setLogFormat(logFormat.kibana, logger);
      expect(logger.format).toEqual(logFormat.kibana);
    });
  });

  describe('set global log format', () => {
    beforeEach(() => {
      setGlobalLogFormat(logFormat.kibana);
    });

    it('global log format getter and setter work', () => {
      expect(getGlobalLogFormat()).toEqual(logFormat.kibana);
    });

    it('should have the global log format, if not applied a more specific format', () => {
      logger = createLogger(messageContext);

      expect(logger.format).toEqual(logFormat.kibana);
    });

    it('should have the log format, if applied a more specific format after creation', () => {
      logger = createLogger(messageContext);
      setLogFormat(logFormat.kibana, messageContext);

      expect(logger.format).toEqual(logFormat.kibana);
    });

    it('should have the log format, if applied a more specific format before creation', () => {
      setLogFormat(logFormat.kibana, messageContext);
      logger = createLogger(messageContext);

      expect(logger.format).toEqual(logFormat.kibana);
    });
  });

  describe('sanitize records', () => {
    it('does not remove any unwanted record properties for common response headers', () => {
      const responseHeaders = {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
        'content-security-policy':
          "default-src 'self' http: https: data: blob: 'unsafe-inline'; frame-ancestors 'self';",
        'cross-origin-embedder-policy': 'require-corp',
        'cross-origin-opener-policy': 'same-origin',
        'cross-origin-resource-policy': 'same-origin',
        date: 'Thu, 10 Feb 2022 14:09:09 GMT',
        etag: 'W/"134d2-7mWFsXsjM/3aYrrtmSWe4HUcaGE"',
        'expect-ct': 'max-age=0',
        'origin-agent-cluster': '?1',
        'permissions-policy': 'interest-cohort=()',
        'referrer-policy': 'no-referrer',
        server: 'nginx',
        'strict-transport-security': 'max-age=15552000; includeSubDomains',
        'x-content-type-options': 'nosniff',
        'x-dns-prefetch-control': 'off',
        'x-download-options': 'noopen',
        'x-frame-options': 'SAMEORIGIN',
        'x-permitted-cross-domain-policies': 'none',
        'x-xss-protection': '0'
      };
      // Should return a copy of the input
      expect(sanitizeRecord(responseHeaders)).not.toBe(responseHeaders);
      expect(sanitizeRecord(responseHeaders)).toEqual(responseHeaders);
    });

    it('does not remove any unwanted record properties for common request headers', () => {
      const requestHeaders = {
        ':authority': 'example.com',
        ':method': 'GET',
        ':path': '/api/v1',
        ':scheme': 'https',
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,de;q=0.8',
        'content-type': 'application/json',
        cookie: 'USERID=1;SERVERID=2',
        dnt: '1',
        'if-none-match': 'W/"134d2-7mWFsXsjM/3aYrrtmSWe4HUcaGE"',
        referer: 'https://example.com',
        'sec-ch-ua':
          '"Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36'
      };
      // Should return a copy of the input
      expect(sanitizeRecord(requestHeaders)).not.toBe(requestHeaders);
      expect(sanitizeRecord(requestHeaders)).toEqual(requestHeaders);
    });

    it('should remove auth headers', () => {
      const input = {
        access_token: 'SECRET',
        my_access_token: 'SECRET',
        authentication: 'secret',
        service_authentication: 'secret',
        authorization: 'secret',
        Authorization: 'secret',
        AUTHORIZATION: 'secret',
        credentials: 'password',
        'x-xsrf-token': 'secret token',
        cookie: 'csrfToken=secret'
      };
      const output = {
        access_token: '<DATA NOT LOGGED TO PREVENT LEAKING SENSITIVE DATA>',
        my_access_token: '<DATA NOT LOGGED TO PREVENT LEAKING SENSITIVE DATA>',
        authentication: '<DATA NOT LOGGED TO PREVENT LEAKING SENSITIVE DATA>',
        service_authentication:
          '<DATA NOT LOGGED TO PREVENT LEAKING SENSITIVE DATA>',
        authorization: '<DATA NOT LOGGED TO PREVENT LEAKING SENSITIVE DATA>',
        Authorization: '<DATA NOT LOGGED TO PREVENT LEAKING SENSITIVE DATA>',
        AUTHORIZATION: '<DATA NOT LOGGED TO PREVENT LEAKING SENSITIVE DATA>',
        credentials: '<DATA NOT LOGGED TO PREVENT LEAKING SENSITIVE DATA>',
        'x-xsrf-token': '<DATA NOT LOGGED TO PREVENT LEAKING SENSITIVE DATA>',
        cookie: '<DATA NOT LOGGED TO PREVENT LEAKING SENSITIVE DATA>'
      };
      expect(sanitizeRecord(input)).toEqual(output);
    });

    it('should replace with correct replacement string', () => {
      const input = {
        JTENANT: 'SECRET',
        password: 'SECRET'
      };
      const output = {
        JTENANT: '****',
        password: '****'
      };
      expect(sanitizeRecord(input, '****')).toEqual(output);
    });

    it('should replace using custom sensitive keys', () => {
      const input = {
        password: 'SECRET',
        authorization: 'SECRET',
        lineOfBusiness: 'SECRET',
        cloudHoster: 'SECRET'
      };
      const output = {
        password: 'SECRET',
        authorization: 'SECRET',
        lineOfBusiness: 'SAP',
        cloudHoster: 'SAP'
      };
      expect(
        sanitizeRecord(input, 'SAP', ['business', 'software', 'cloud'])
      ).toEqual(output);
    });
  });

  describe('mute logger', () => {
    function allTransportsAreSilent(someLogger, silent: boolean): boolean {
      return someLogger.transports.every(
        transport => transport.silent === silent
      );
    }

    it('silences existing loggers', () => {
      const logger1 = createLogger('logger1');
      const logger2 = createLogger('logger2');

      muteLoggers();

      expect(allTransportsAreSilent(logger1, true)).toBe(true);
      expect(allTransportsAreSilent(logger2, true)).toBe(true);
    });

    it('silences new loggers', () => {
      muteLoggers();

      const logger1 = createLogger('logger1');
      const logger2 = createLogger('logger2');

      expect(allTransportsAreSilent(logger1, true)).toBe(true);
      expect(allTransportsAreSilent(logger2, true)).toBe(true);
    });

    it('unsilences existing and new loggers', () => {
      const logger1 = createLogger('logger1');

      muteLoggers();

      const logger2 = createLogger('logger2');

      unmuteLoggers();

      const logger3 = createLogger('logger3');

      expect(allTransportsAreSilent(logger1, false)).toBe(true);
      expect(allTransportsAreSilent(logger2, false)).toBe(true);
      expect(allTransportsAreSilent(logger3, false)).toBe(true);
    });
  });
});

const spyOnWrite = logger => {
  const transport = logger.transports[0];
  if (transport && transport.log && transport.log.mockReset) {
    transport.log.mockReset();
  }
  transport.log = jest.fn();
  return transport.log;
};
