import axios from 'axios';
import nock from 'nock';
import { circuitBreakers } from './circuit-breaker';
import { executeWithMiddleware } from './middleware';
import { resilience } from './resilience';
import { retry } from './retry';
import { timeout } from './timeout';
import type { MiddlewareContext } from './middleware';
import type { AxiosResponse, RawAxiosRequestConfig } from 'axios';

describe('combined resilience features', () => {
  const HTTP_STATUS = {
    OK: 200,
    NO_CONTENT: 204,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    SERVICE_UNAVAILABLE: 503
  };
  const host = 'http://example.com';
  const request = config => axios.request(config);

  beforeEach(() => {
    Object.keys(circuitBreakers).forEach(key => delete circuitBreakers[key]);
    nock.cleanAll();
  });

  it('needs to retry with delay below timeout', async () => {
    nock('https://example.com', {})
      .get('/retry')
      .delay(300)
      .reply(HTTP_STATUS.SERVICE_UNAVAILABLE)
      .get('/retry')
      .delay(300)
      .reply(HTTP_STATUS.OK);

    const requestConfig = {
      baseURL: 'https://example.com',
      method: 'get',
      url: '/retry'
    };

    await expect(
      executeWithMiddleware([retry(2), timeout(600)], {
        context: {
          uri: 'https://example.com',
          tenantId: 'dummy-tenant'
        },
        fnArgument: requestConfig,
        fn: request
      })
    ).resolves.not.toThrow();
  }, 10000);

  it('needs to retry with delay above timeout and gets status code of the response with small delay', async () => {
    nock('https://example.com', {})
      .get('/retry')
      .delay(300)
      .reply(HTTP_STATUS.NO_CONTENT)
      .get('/retry')
      .delay(50)
      .reply(HTTP_STATUS.OK);

    const config = {
      baseURL: 'https://example.com',
      method: 'get',
      url: '/retry'
    };

    const response = await executeWithMiddleware([retry(2), timeout(200)], {
      context: {
        uri: 'https://example.com',
        tenantId: 'dummy-tenant'
      },
      fnArgument: config,
      fn: request
    });

    expect(response.status).toBe(HTTP_STATUS.OK);
  }, 10000);

  it('uses circuit breaker and timeout by default with resilience()', async () => {
    const delay = 100;
    nock(host, {})
      .persist()
      .get(/with-delay/)
      .delay(delay)
      .reply(200);

    const requestConfig: RawAxiosRequestConfig = {
      method: 'get',
      baseURL: host,
      url: 'with-delay'
    };
    const context: MiddlewareContext<RawAxiosRequestConfig> = {
      uri: host,
      tenantId: 'myTestTenant'
    };

    const keepCalling = true;
    while (keepCalling) {
      await expect(
        executeWithMiddleware<
          RawAxiosRequestConfig,
          AxiosResponse,
          MiddlewareContext<RawAxiosRequestConfig>
        >(resilience({ timeout: delay * 0.5 }), {
          context,
          fn: request,
          fnArgument: requestConfig
        })
      ).rejects.toThrow();

      const breaker = circuitBreakers[`${host}::myTestTenant`];
      if (breaker.opened) {
        break;
      }
    }
    expect(circuitBreakers[`${host}::myTestTenant`].stats.failures).toBe(10);
    expect(circuitBreakers[`${host}::myTestTenant`].stats.fires).toBe(10);
    await expect(
      executeWithMiddleware<
        RawAxiosRequestConfig,
        AxiosResponse,
        MiddlewareContext<RawAxiosRequestConfig>
      >(resilience({ timeout: false }), {
        context,
        fn: request,
        fnArgument: requestConfig
      })
    ).rejects.toThrow('Breaker is open');

    expect(circuitBreakers[`${host}::myTestTenant`].stats.failures).toBe(10);
    expect(circuitBreakers[`${host}::myTestTenant`].stats.fires).toBe(11);
  });

  it('retry and circuit breaker are not used for 4xx error', async () => {
    nock(host, {})
      .get(/with-retry/)
      .reply(HTTP_STATUS.UNAUTHORIZED);

    const requestConfig: RawAxiosRequestConfig = {
      method: 'get',
      baseURL: host,
      url: 'with-retry'
    };
    const context: MiddlewareContext<RawAxiosRequestConfig> = {
      uri: host,
      tenantId: 'myTestTenant'
    };
    await expect(
      executeWithMiddleware<
        RawAxiosRequestConfig,
        AxiosResponse,
        MiddlewareContext<RawAxiosRequestConfig>
      >(resilience({ retry: true }), {
        context,
        fn: request,
        fnArgument: requestConfig
      })
    ).rejects.toThrow(/Request failed with status code 401/);
    expect(circuitBreakers[`${host}::myTestTenant`].opened).toBe(false);
    expect(circuitBreakers[`${host}::myTestTenant`].stats.failures).toBe(0);
    expect(circuitBreakers[`${host}::myTestTenant`].stats.fires).toBe(1);
  });

  it('does 3 retries and does not open the circuit breaker for few server errors', async () => {
    nock(host, {})
      .get(/with-retry/)
      .times(3)
      .reply(HTTP_STATUS.SERVICE_UNAVAILABLE)
      .get(/with-retry/)
      .reply(HTTP_STATUS.OK);

    const requestConfig: RawAxiosRequestConfig = {
      method: 'get',
      baseURL: host,
      url: 'with-retry'
    };
    const context: MiddlewareContext<RawAxiosRequestConfig> = {
      uri: host,
      tenantId: 'myTestTenant'
    };
    await expect(
      executeWithMiddleware<
        RawAxiosRequestConfig,
        AxiosResponse,
        MiddlewareContext<RawAxiosRequestConfig>
      >(resilience({ timeout: false, retry: true }), {
        context,
        fn: request,
        fnArgument: requestConfig
      })
    ).resolves.not.toThrow();

    expect(circuitBreakers[`${host}::myTestTenant`].opened).toBe(false);
  }, 15000);

  it('throws an error when retry is less than 1', async () => {
    expect(() => resilience({ retry: -2 })).toThrow(
      'Number of retries must be greater or equal to 0.'
    );
  });

  it('throws an error when timeout is less or equal to 0', async () => {
    expect(() => resilience({ timeout: 0 })).toThrow(
      'Timeout must be greater than 0.'
    );
  });
});
