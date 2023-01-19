// eslint-disable-next-line import/named
import axios, { AxiosResponse, RawAxiosRequestConfig } from 'axios';
import nock from 'nock';
import { circuitBreakers } from './circuit-breaker';
import { executeWithMiddleware, HttpMiddlewareContext } from './middleware';
import { resilience } from './resilience';
import { retry } from './retry';
import { timeout } from './timeout';

describe('combined resilience features', () => {
  const HTTP_STATUS = {
    OK: 200,
    NO_CONTENT: 204,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    SERVICE_UNAVAILABLE: 503
  };
  const host = 'http://example.com';

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

    const request = () =>
      axios.request({
        baseURL: 'https://example.com',
        method: 'get',
        url: '/retry'
      });

    await expect(
      executeWithMiddleware(
        [timeout(600), retry(2)],
        { uri: 'https://example.com', tenantId: 'dummy-tenant' },
        request
      )
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

    const request = () =>
      axios.request({
        baseURL: 'https://example.com',
        method: 'get',
        url: '/retry'
      });

    const response = await executeWithMiddleware(
      [timeout(200), retry(2)],
      { uri: 'https://example.com', tenantId: 'dummy-tenant' },
      request
    );

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
    const context: HttpMiddlewareContext = {
      requestConfig,
      uri: host,
      tenantId: 'myTestTenant'
    };
    const request = () => axios.request(requestConfig);
    const keepCalling = true;
    while (keepCalling) {
      await expect(
        executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
          resilience({ timeout: delay * 0.5 }),
          context,
          request
        )
      ).rejects.toThrow();

      const breaker = circuitBreakers[`${host}::myTestTenant`];
      if (breaker.opened) {
        break;
      }
    }
    expect(circuitBreakers[`${host}::myTestTenant`].stats.failures).toBe(10);
    expect(circuitBreakers[`${host}::myTestTenant`].stats.fires).toBe(10);
    await expect(
      executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
        resilience({ timeout: false }),
        context,
        request
      )
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
    const context: HttpMiddlewareContext = {
      requestConfig,
      uri: host,
      tenantId: 'myTestTenant'
    };
    const request = () => axios.request(requestConfig);
    await expect(
      executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
        resilience({ retry: true }),
        context,
        request
      )
    ).rejects.toThrowError(/Request failed with status code 401/);
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
    const context: HttpMiddlewareContext = {
      requestConfig,
      uri: host,
      tenantId: 'myTestTenant'
    };
    const request = () => axios.request(requestConfig);
    await expect(
      executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
        resilience({ timeout: false, retry: true }),
        context,
        request
      )
    ).resolves.not.toThrowError();

    expect(circuitBreakers[`${host}::myTestTenant`].opened).toBe(false);
  }, 15000);

  it('throws an error when retry is less than 1', async () => {
    expect(() => resilience({ retry: -2 })).toThrowError(
      'Retry count value is invalid.'
    );
  });

  it('throws an error when timeout is less or equal to 0', async () => {
    expect(() => resilience({ timeout: 0 })).toThrowError(
      'Timeout value is invalid.'
    );
  });
});
