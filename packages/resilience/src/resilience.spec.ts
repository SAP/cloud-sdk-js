// eslint-disable-next-line import/named
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import nock from 'nock';
import { circuitBreakerHttp, circuitBreakers } from './circuit-breaker';
import { executeWithMiddleware, HttpMiddlewareContext } from './middleware';
import { retry } from './retry';
import { timeout } from './timeout';

describe('combined resilience features', () => {
  const HTTP_STATUS = {
    OK: 200,
    NO_CONTENT: 204,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    SERVICE_UNAVAILABLE: 504
  };
  const host = 'http://example.com';

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
  it('circuit breaker works together with a timeout', async () => {
    const delay = 100;
    nock(host, {})
      .persist()
      .get(/with-delay/)
      .delay(delay)
      .reply(200);

    const requestConfig: AxiosRequestConfig = {
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
          [timeout(delay * 0.5), circuitBreakerHttp()],
          context,
          request
        )
      ).rejects.toThrow();

      const breaker = circuitBreakers[`${host}::myTestTenant`];
      if (breaker.opened) {
        break;
      }
    }
    await expect(
      executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
        [circuitBreakerHttp()],
        context,
        request
      )
    ).rejects.toThrow('Breaker is open');
  });
});
