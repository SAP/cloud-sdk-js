// eslint-disable-next-line import/named
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import nock from 'nock';
import { executeWithMiddleware, HttpMiddlewareContext } from './middleware';
import { circuitbreakerHttp, circuitBreakers } from './circuitbreaker';
import { timeout } from './timeout';

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
          [circuitbreakerHttp()],
          context,
          request
        )
      ).rejects.toThrow();
      const breaker = circuitBreakers[`${host}::failing-500::myTestTenant`];
      if (breaker.opened) {
        break;
      }
    }
    await expect(
      executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
        [circuitbreakerHttp()],
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
          [circuitbreakerHttp()],
          context,
          request
        )
      ).rejects.toThrow();

      keepCalling = !mock.isDone();
    }
    expect(
      circuitBreakers[`${host}::failing-ignore::myTestTenant`].opened
    ).toBe(false);
  });

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
      [circuitbreakerHttp()],
      context,
      request
    );
    await executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
      [circuitbreakerHttp()],
      { ...context, tenantId: 'tenant2' },
      request
    );

    expect(Object.keys(circuitBreakers)).toEqual([
      `${host}::ok::tenant1`,
      `${host}::ok::tenant2`
    ]);
  });

  it('creates circuit breaker for each service', async () => {
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
      [circuitbreakerHttp()],
      context(requestConfigPath1),
      request(requestConfigPath1)
    );
    await executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
      [circuitbreakerHttp()],
      context(requestConfigPath2),
      request(requestConfigPath2)
    );

    expect(Object.keys(circuitBreakers)).toEqual([
      `${host}::path-1::tenant1`,
      `${host}::path-2::tenant1`
    ]);
  });

  it('reacts correctly on xsuaa failures', () => {
    throw new Error('Add a error filter also for XSUAA errors.');
  });

  it('works together with a timeout', async () => {
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
          [timeout(delay * 0.5), circuitbreakerHttp()],
          context,
          request
        )
      ).rejects.toThrow();

      const breaker = circuitBreakers[`${host}::with-delay::myTestTenant`];
      if (breaker.opened) {
        break;
      }
    }
    await expect(
      executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
        [circuitbreakerHttp()],
        context,
        request
      )
    ).rejects.toThrow('Breaker is open');
  });
});
