// eslint-disable-next-line import/named
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import nock from 'nock';
import { executeWithMiddleware, HttpMiddlewareContext } from './middleware';
import { circuitBreakerHttp, circuitBreakers } from './circuit-breaker';

describe('circuit-breaker', () => {
  beforeEach(() => {
    Object.keys(circuitBreakers).forEach(key => delete circuitBreakers[key]);
    nock.cleanAll();
  });

  const host = 'http://example.com';
  it('opens breaker', async () => {
    nock(host, {})
      .persist()
      .get(/failing-500/)
      .reply(500);

    const requestConfig: AxiosRequestConfig = {
      method: 'get',
      baseURL: host,
      url: 'failing-500'
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
          [circuitBreakerHttp()],
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

  it('does not open for 401, 403 or 404 responses', async () => {
    const mock = nock(host, {})
      .get(/failing-ignore/)
      .times(10)
      .reply(401)
      .get(/failing-ignore/)
      .times(10)
      .reply(403)
      .get(/failing-ignore/)
      .times(10)
      .reply(404);

    const requestConfig: AxiosRequestConfig = {
      method: 'get',
      baseURL: host,
      url: 'failing-ignore'
    };
    const context: HttpMiddlewareContext = {
      requestConfig,
      uri: host,
      tenantId: 'myTestTenant'
    };
    const request = () => axios.request(requestConfig);
    let keepCalling = !mock.isDone();
    while (keepCalling) {
      await expect(
        executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
          [circuitBreakerHttp()],
          context,
          request
        )
      ).rejects.toThrow();

      keepCalling = !mock.isDone();
    }
    expect(circuitBreakers[`${host}::myTestTenant`].opened).toBe(false);
  }, 15000);

  it('creates circuit breaker for each tenant', async () => {
    nock(host, {}).get(/ok/).times(2).reply(200);

    const requestConfig: AxiosRequestConfig = {
      method: 'get',
      baseURL: host,
      url: 'ok'
    };
    const request = () => axios.request(requestConfig);
    const context: HttpMiddlewareContext = {
      requestConfig,
      uri: host,
      tenantId: 'tenant1'
    };

    await executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
      [circuitBreakerHttp()],
      context,
      request
    );
    await executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
      [circuitBreakerHttp()],
      { ...context, tenantId: 'tenant2' },
      request
    );

    expect(Object.keys(circuitBreakers)).toEqual([
      `${host}::tenant1`,
      `${host}::tenant2`
    ]);
  });

  it('creates one circuit breaker for all requests against the same host', async () => {
    nock(host, {})
      .get(/path-1/)
      .reply(200)
      .get(/path-2/)
      .reply(200);

    const requestConfigPath1: AxiosRequestConfig = {
      method: 'get',
      baseURL: host,
      url: 'path-1'
    };
    const requestConfigPath2: AxiosRequestConfig = {
      method: 'get',
      baseURL: host,
      url: 'path-2'
    };
    const request = requestConfig => () => axios.request(requestConfig);
    const context: (
      requestConfig: AxiosRequestConfig
    ) => HttpMiddlewareContext = requestConfig => ({
      requestConfig,
      uri: host,
      tenantId: 'tenant1'
    });

    await executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
      [circuitBreakerHttp()],
      context(requestConfigPath1),
      request(requestConfigPath1)
    );
    await executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
      [circuitBreakerHttp()],
      context(requestConfigPath2),
      request(requestConfigPath2)
    );

    expect(Object.keys(circuitBreakers)).toEqual([`${host}::tenant1`]);
  });

  it('does not open breaker for 401 xsuaa failures', async () => {
    const mock = nock(host, {})
      .post(/oauth\/token/)
      .times(10)
      .reply(401);

    const requestConfig: AxiosRequestConfig = {
      method: 'post',
      baseURL: host,
      url: '/oauth/token',
      data: {
        client_id: 'client_id',
        client_secret: 'wrong_client_secret',
        grant_type: 'client_credentials'
      }
    };
    const context: HttpMiddlewareContext = {
      requestConfig,
      uri: host,
      tenantId: 'myTestTenant'
    };
    const request = () => axios.request(requestConfig);
    let keepCalling = !mock.isDone();
    while (keepCalling) {
      await expect(
        executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
          [circuitBreakerHttp()],
          context,
          request
        )
      ).rejects.toThrowError(/Request failed with status code 401/);
      keepCalling = !mock.isDone();
    }
    expect(circuitBreakers[`${host}::myTestTenant`].opened).toBe(false);
  });
});
