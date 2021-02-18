import { resolve } from 'path';
import execa from 'execa';
import { createLogger, kibana, local } from '@sap-cloud-sdk/util';
import { Logger } from 'winston';

describe('exception logger', () => {
  let logger: Logger;

  beforeEach(() => {
    if (logger) {
      logger.close();
    }
  });

  it('should log exception with stack if they fly locally', async () => {
    await expect(
      execa('ts-node', [
        resolve(__dirname, 'throw-exception-with-logger-script.ts')
      ])
    ).rejects.toThrowError(/Test Exception Logger\n\s*at Object/);
  }, 10000);

  it('should log exception with stack if they fly on CF', async () => {
    process.env.VCAP_SERVICES = 'exists';
    await expect(
      execa('ts-node', [
        resolve(__dirname, 'throw-exception-with-logger-script.ts')
      ])
    ).rejects.toThrowError(/Test Exception Logger\\n\s*at Object/);
    delete process.env.VCAP_SERVICES;
  }, 10000);

  it('should not log the stack multiple times', async () => {
    try {
      await execa('ts-node', [
        resolve(__dirname, 'throw-exception-with-logger-script.ts')
      ]);
    } catch (err) {
      expect(err.message.match(/Test Exception Logger/g).length).toBe(1);
    }
  }, 10000);

  it('logs stack trace of exception locally', () => {
    const tranformerSpy = jest.spyOn(local, 'transform');
    logger = createLogger('stack-logger-local');
    logger.error(new Error('My Error'));

    expect(tranformerSpy).toReturnWith(
      expect.objectContaining({
        message: expect.stringMatching(/My Error\n\s+at\sObject/)
      })
    );
  });

  it('logs stack trace of exception on CF', () => {
    const tranformerSpy = jest.spyOn(kibana, 'transform');
    logger = createLogger('stack-logger-cf');
    logger.format = kibana;
    logger.error(new Error('My Error'));

    expect(tranformerSpy).toReturnWith(
      expect.objectContaining({
        msg: expect.stringMatching(/My Error\n\s+at\sObject/)
      })
    );
  });

  it('logs message with padding if string is given', () => {
    const tranformerSpy = jest.spyOn(local, 'transform');
    logger = createLogger('stack-logger-string');
    logger.error('My Error.');
    expect(tranformerSpy).toReturnWith(
      expect.objectContaining({ message: '   My Error.' })
    );
  });

  it('does not log stack on lower log levels', () => {
    const tranformerSpy = jest.spyOn(local, 'transform');
    logger = createLogger('stack-logger-string');
    logger.info(new Error('My Error'));
    expect(tranformerSpy).toReturnWith(
      expect.objectContaining({ message: '   My Error.' })
    );
  });
});
