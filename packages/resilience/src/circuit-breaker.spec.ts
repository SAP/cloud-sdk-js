// eslint-disable-next-line import/named
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import nock from 'nock';
import { executeWithMiddleware, HttpMiddlewareContext } from './middleware';
import {
  circuitBreakerHttp,
  circuitBreakers,
  circuitBreakerXSUAA
} from './circuit-breaker';
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
          [circuitBreakerHttp()],
          context,
          request
        )
      ).rejects.toThrow();
      const breaker =
        circuitBreakers[`${host}::failing-500::get::myTestTenant`];
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
    expect(
      circuitBreakers[`${host}::failing-ignore::get::myTestTenant`].opened
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
      `${host}::ok::get::tenant1`,
      `${host}::ok::get::tenant2`
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
      [circuitBreakerHttp()],
      context(requestConfigPath1),
      request(requestConfigPath1)
    );
    await executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
      [circuitBreakerHttp()],
      context(requestConfigPath2),
      request(requestConfigPath2)
    );

    expect(Object.keys(circuitBreakers)).toEqual([
      `${host}::path-1::get::tenant1`,
      `${host}::path-2::get::tenant1`
    ]);
  });

  it('does not open breaker for 401 xsuaa failures', async () => {
    nock(host, {})
      .post(/oauth\/token/)
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
    await expect(
      executeWithMiddleware<AxiosResponse, HttpMiddlewareContext>(
        [circuitBreakerXSUAA()],
        context,
        request
      )
    ).rejects.toThrowError(/Request failed with status code 401/);

    expect(circuitBreakers[`${host}::myTestTenant`].opened).toBe(false);
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
          [timeout(delay * 0.5), circuitBreakerHttp()],
          context,
          request
        )
      ).rejects.toThrow();

      const breaker = circuitBreakers[`${host}::with-delay::get::myTestTenant`];
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
