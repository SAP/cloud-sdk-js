/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  cloudSdkExceptionLogger,
  createLogger,
  disableExceptionLogger,
  enableExceptionLogger,
  getLogger,
  setLogLevel
} from '../../src';

describe('Cloud SDK Logger', () => {
  const messageContext = 'my-module';
  const message = 'MESSAGE';
  let logger;

  afterEach(() => {
    logger.close();
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

  describe('set log level', () => {
    const level = 'silly';

    it('before creating a logger, should set the log level on creation', () => {
      setLogLevel(level, messageContext);
      logger = createLogger(messageContext);
      expect(logger.level).toEqual(level);
    });

    it('after creating a logger, should set the log level on creation', () => {
      logger = createLogger(messageContext);
      setLogLevel(level, messageContext);
      expect(logger.level).toEqual(level);
    });

    it('on a logger should set the log level', () => {
      logger = createLogger(messageContext);
      setLogLevel(level, logger);
      expect(logger.level).toEqual(level);
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
