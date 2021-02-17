import {
  cloudSdkExceptionLogger,
  createLogger,
  disableExceptionLogger,
  enableExceptionLogger,
  getLogger,
  setLogLevel,
  setGlobalLogLevel,
  getGlobalLogLevel,
  muteLoggers,
  unmuteLoggers
} from '../../src';

describe('Cloud SDK Logger', () => {
  const messageContext = 'my-module';
  const message = 'MESSAGE';
  let logger;

  afterEach(() => {
    logger.close();
    setLogLevel('', messageContext);
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

    it('logs stack trace of exception', () => {
      const spyStd = jest
        .spyOn(process.stdout, 'write')
        .mockImplementation(function () {
          return true;
        });

      logger = createLogger('stack-logger');
      function level1() {
        level2();
      }

      function level2() {
        throw new Error('Error thrown in function level 2');
      }

      try {
        level1();
      } catch (err) {
        logger.error(err);
        expect(spyStd).toHaveBeenCalledWith(
          expect.stringMatching(
            /Error: Error thrown in function level 2\n\s*at level2.*\n\s*at level1/
          )
        );
        spyStd.mockRestore();
        return;
      }
      throw new Error('This point should not be reached.');
    });
    it('check also for kibanan',()=>{
      throw new Error('do it')
    })

    it('logs stack trace of exception with the exception logger', () => {
      const spyStd = jest
        .spyOn(process.stdout, 'write')
        .mockImplementation(function () {
          return true;
        });
      logger = createLogger('stack-logger');
      function level1() {
        throw new Error('Error thrown in function level 1');
      }

      try {
        level1();
      } catch (err) {
        cloudSdkExceptionLogger.error(err);
        expect(spyStd).toHaveBeenCalledWith(
          expect.stringMatching(
            /Error: Error thrown in function level 1\n\s*at level1/
          )
        );
        spyStd.mockRestore();
        return;
      }
      throw new Error('This point should not be reached.');
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

  describe('set global log level', () => {
    const level = 'error';

    beforeAll(() => {
      setGlobalLogLevel(level);
    });

    it('global log level getter and setter work', () => {
      expect(level).toEqual(getGlobalLogLevel());
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
