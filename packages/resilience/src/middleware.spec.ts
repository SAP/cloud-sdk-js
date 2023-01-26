import { createLogger } from '@sap-cloud-sdk/util/dist/logger';
import {
  MiddlewareContext,
  executeWithMiddleware,
  MiddlewareOptions
} from './middleware';

describe('middleware', () => {
  const logger = createLogger('middleware');

  const middleWareAppend1 = function (
    options: MiddlewareOptions<string, string, MiddlewareContext<string>>
  ) {
    const id = 'append1';
    return s => {
      logger.info(id);
      return options.fn(s + ' ' + id);
    };
  };
  const middleWareAppend2 = function (
    options: MiddlewareOptions<string, string, MiddlewareContext<string>>
  ) {
    const id = 'append2';
    return s => {
      logger.info(id);
      return options.fn(s + ' ' + id);
    };
  };

  const middleWareSkip = function (
    options: MiddlewareOptions<string, string, MiddlewareContext<string>>
  ) {
    options.skipNext();
    return options.fn;
  };

  const middleWareAdjustArgument = function (
    options: MiddlewareOptions<string, string, MiddlewareContext<string>>
  ) {
    options.context.fnArgument = 'Changed by middleware';
    return options.fn;
  };

  it('adds middlewares in the expected order', async () => {
    const infoSpy = jest.spyOn(logger, 'info');
    const actual = await executeWithMiddleware(
      [middleWareAppend1, middleWareAppend2],
      { uri: 'dummyUri', fnArgument: 'initial Input', tenantId: 'dummyTenant' },
      (s: string) => Promise.resolve(s)
    );
    expect(infoSpy).toHaveBeenNthCalledWith(2, 'append1');
    expect(infoSpy).toHaveBeenNthCalledWith(1, 'append2');
    expect(actual).toBe('initial Input append2 append1');
  });

  it('stops middlewares if skip is called', async () => {
    const actual = await executeWithMiddleware(
      [middleWareAppend1, middleWareSkip, middleWareAppend2],
      { uri: 'dummyUri', fnArgument: 'initial Input', tenantId: 'dummyTenant' },
      (s: string) => Promise.resolve(s)
    );
    expect(actual).toBe('initial Input append1');
  });

  it('allows to adjust function argument via middlewares', async () => {
    const actual = await executeWithMiddleware(
      [middleWareAppend1, middleWareAdjustArgument],
      { uri: 'dummyUri', fnArgument: 'initial Input', tenantId: 'dummyTenant' },
      (s: string) => Promise.resolve(s)
    );
    expect(actual).toBe('Changed by middleware append1');
  });
});
