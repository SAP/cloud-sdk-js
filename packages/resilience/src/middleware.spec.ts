import { createLogger } from '@sap-cloud-sdk/util/dist/logger';
import { executeWithMiddleware } from './middleware';
import type { MiddlewareContext, MiddlewareOptions } from './middleware';

describe('middleware', () => {
  const logger = createLogger('middleware');
  const context = { uri: 'dummyUri', tenantId: 'dummyTenant' };

  const beforeMiddlewareBuilder = appendString =>
    function (
      options: MiddlewareOptions<string, string, MiddlewareContext<string>>
    ) {
      logger.info(`Before Middleware added: ${appendString}`);
      return s => options.fn(`${s} ${appendString}`);
    };
  const afterMiddlewareBuilder = appendString =>
    function (
      options: MiddlewareOptions<string, string, MiddlewareContext<string>>
    ) {
      logger.info(`After Middleware added: ${appendString}`);
      return async s => {
        const result = await options.fn(s);
        return `${result} ${appendString}`;
      };
    };

  const middleWareAdjustArgument = function (
    options: MiddlewareOptions<string, string, MiddlewareContext<string>>
  ) {
    return s => options.fn(`${s} adjusted by Middleware`);
  };

  it('adds middlewares in the expected order - right to left', async () => {
    const infoSpy = jest.spyOn(logger, 'info');
    executeWithMiddleware(
      [
        beforeMiddlewareBuilder('A'),
        afterMiddlewareBuilder('B'),
        beforeMiddlewareBuilder('C'),
        afterMiddlewareBuilder('D')
      ],
      {
        fn: (s: string) => Promise.resolve(s),
        context,
        fnArgument: 'initial Input'
      }
    );
    expect(infoSpy).toHaveBeenNthCalledWith(1, 'After Middleware added: D');
    expect(infoSpy).toHaveBeenNthCalledWith(2, 'Before Middleware added: C');
    expect(infoSpy).toHaveBeenNthCalledWith(3, 'After Middleware added: B');
    expect(infoSpy).toHaveBeenNthCalledWith(4, 'Before Middleware added: A');
  });

  it('executes middlewares in the expected order like implied by composition (only after middlewares)', async () => {
    jest.spyOn(logger, 'info');
    const actual = await executeWithMiddleware(
      [afterMiddlewareBuilder('A'), afterMiddlewareBuilder('B')],
      {
        fn: (s: string) => Promise.resolve(s),
        context,
        fnArgument: 'initial Input'
      }
    );
    expect(actual).toBe('initial Input B A');
  });

  it('executes middlewares in the expected order - after and before middlewares', async () => {
    jest.spyOn(logger, 'info');
    const actual = await executeWithMiddleware(
      [
        beforeMiddlewareBuilder('A'),
        afterMiddlewareBuilder('B'),
        beforeMiddlewareBuilder('C'),
        afterMiddlewareBuilder('D')
      ],
      {
        fn: (s: string) => Promise.resolve(s),
        context,
        fnArgument: 'initial Input'
      }
    );
    expect(actual).toBe('initial Input A C D B');
  });

  it('allows to adjust function argument via middlewares', async () => {
    const actual = await executeWithMiddleware(
      [afterMiddlewareBuilder('A'), middleWareAdjustArgument],
      {
        fn: (s: string) => Promise.resolve(s),
        context,
        fnArgument: 'initial Input'
      }
    );
    expect(actual).toBe('initial Input adjusted by Middleware A');
  });
});
