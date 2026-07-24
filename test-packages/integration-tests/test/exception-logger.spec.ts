import { resolve } from 'path';
import { createLogger, kibana, local } from '@sap-cloud-sdk/util';
import type { Logger } from 'winston';

const tinyexec = import('tinyexec');

async function execNodeScript(scriptPath: string): Promise<void> {
  const { x } = await tinyexec;
  const result = await x('ts-node', [scriptPath]);
  if (result.exitCode) {
    throw new Error(result.stderr || result.stdout);
  }
}

describe('exception logger', () => {
  let logger: Logger;

  beforeEach(() => {
    if (logger) {
      logger.close();
    }
  });

  it('should log exception with local format if they fly in development mode', async () => {
    process.env.NODE_ENV = 'development';
    await expect(
      execNodeScript(
        resolve(__dirname, 'throw-exception-with-logger-script.ts')
      )
    ).rejects.toThrow(/Test Exception Logger\n\s*at Object/);
    delete process.env.NODE_ENV;
  }, 15000);

  it('should log exception with kibana format if they fly in production mode', async () => {
    process.env.NODE_ENV = 'production';
    await expect(
      execNodeScript(
        resolve(__dirname, 'throw-exception-with-logger-script.ts')
      )
    ).rejects.toThrow(/Test Exception Logger\\n\s*at Object/);
    delete process.env.NODE_ENV;
  }, 15000);

  it('should not log the stack multiple times', async () => {
    try {
      await execNodeScript(
        resolve(__dirname, 'throw-exception-with-logger-script.ts')
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(
        (err as Error).message.match(/Test Exception Logger/g)
      ).toHaveLength(1);
    }
  }, 15000);

  it('logs stack trace of exception locally', () => {
    const tranformerSpy = jest.spyOn(local, 'transform');
    logger = createLogger('stack-logger-local');
    logger.error(new Error('My Error'));

    expect(tranformerSpy).toHaveReturnedWith(
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

    expect(tranformerSpy).toHaveReturnedWith(
      expect.objectContaining({
        msg: expect.stringMatching(/My Error\n\s+at\sObject/)
      })
    );
  });

  it('logs message with padding if string is given', () => {
    const tranformerSpy = jest.spyOn(local, 'transform');
    logger = createLogger('stack-logger-string');
    logger.error('My Error.');
    expect(tranformerSpy).toHaveReturnedWith(
      expect.objectContaining({ message: '   My Error.' })
    );
  });

  it('does not log stack on lower log levels', () => {
    const tranformerSpy = jest.spyOn(local, 'transform');
    logger = createLogger('stack-logger-string');
    logger.info(new Error('My Error'));
    expect(tranformerSpy).toHaveReturnedWith(
      expect.objectContaining({ message: '   My Error.' })
    );
  });
});
