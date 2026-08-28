import axios from 'axios';
import nock from 'nock';
import { timeout } from './timeout';
import { executeWithMiddleware } from './middleware';
import { resilience } from './resilience';
import type { MiddlewareContext } from './middleware';
import type { AxiosResponse, RawAxiosRequestConfig } from 'axios';

describe('timeout', () => {
  const request = (config: RawAxiosRequestConfig) => axios.request(config);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('uses a custom timeout if given', async () => {
    nock('https://example.com', {})
      .get('/with-delay')
      .delay(5000)
      .reply(200)
      .get('/with-delay')
      .delay(5)
      .reply(200);

    const requestConfig = {
      baseURL: 'https://example.com',
      method: 'get',
      url: '/with-delay'
    };

    const rejection = executeWithMiddleware([timeout(100)], {
      context: {
        uri: 'https://example.com',
        tenantId: 'dummy-tenant'
      },
      fnArgument: requestConfig,
      fn: request
    });
    const rejectionExpectation = expect(rejection).rejects.toThrow(
      'Request to URL: https://example.com ran into a timeout after 100ms.'
    );
    await jest.advanceTimersByTimeAsync(100);
    await rejectionExpectation;

    const success = executeWithMiddleware(
      resilience<
        RawAxiosRequestConfig,
        AxiosResponse,
        MiddlewareContext<RawAxiosRequestConfig>
      >({ timeout: 200, circuitBreaker: false }),
      {
        context: {
          uri: 'https://example.com',
          tenantId: 'dummy-tenant'
        },
        fnArgument: requestConfig,
        fn: request
      }
    );
    await jest.advanceTimersByTimeAsync(0);
    await expect(success).resolves.toMatchObject({ status: 200 });
  });

  it('uses 10 seconds default timeout', async () => {
    nock('https://example.com', {})
      .get('/with-delay')
      .delay(5)
      .reply(200)
      .get('/with-delay')
      .delay(15000)
      .reply(200);

    const requestConfig = {
      baseURL: 'https://example.com',
      method: 'get',
      url: '/with-delay'
    };

    const success = executeWithMiddleware([timeout()], {
      context: {
        uri: 'https://example.com',
        tenantId: 'dummy-tenant'
      },
      fnArgument: requestConfig,
      fn: request
    });
    await jest.advanceTimersByTimeAsync(0);
    await expect(success).resolves.toMatchObject({ status: 200 });

    const timedOut = executeWithMiddleware([timeout()], {
      context: {
        uri: 'https://example.com',
        tenantId: 'dummy-tenant'
      },
      fnArgument: requestConfig,
      fn: request
    });
    const timeoutExpectation = expect(timedOut).rejects.toThrow(
      'Request to URL: https://example.com ran into a timeout after 10000ms'
    );
    await jest.advanceTimersByTimeAsync(10000);
    await timeoutExpectation;
  });
});
