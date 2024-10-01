// eslint-disable-next-line import/named
import axios from 'axios';
import nock from 'nock';
import { circuitBreakers, circuitBreaker } from './circuit-breaker';
import { executeWithMiddleware } from './middleware';
import type { MiddlewareContext } from './middleware';
import type { AxiosResponse, RawAxiosRequestConfig } from 'axios';

describe('circuit-breaker', () => {
  beforeEach(() => {
    Object.keys(circuitBreakers).forEach(key => delete circuitBreakers[key]);
    nock.cleanAll();
  });

  const request = config => axios.request(config);

  const host = 'http://example.com';
  it('opens breaker', async () => {
    nock(host, {})
      .persist()
      .get(/failing-500/)
      .reply(500);

    const requestConfig: RawAxiosRequestConfig = {
      method: 'get',
      baseURL: host,
      url: 'failing-500'
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
        >([circuitBreaker()], {
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
    await expect(
      executeWithMiddleware<
        RawAxiosRequestConfig,
        AxiosResponse,
        MiddlewareContext<RawAxiosRequestConfig>
      >([circuitBreaker()], {
        context,
        fn: request,
        fnArgument: requestConfig
      })
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

    const requestConfig: RawAxiosRequestConfig = {
      method: 'get',
      baseURL: host,
      url: 'failing-ignore'
    };
    const context: MiddlewareContext<RawAxiosRequestConfig> = {
      uri: host,
      tenantId: 'myTestTenant'
    };

    let keepCalling = !mock.isDone();
    while (keepCalling) {
      await expect(
        executeWithMiddleware<
          RawAxiosRequestConfig,
          AxiosResponse,
          MiddlewareContext<RawAxiosRequestConfig>
        >([circuitBreaker()], {
          context,
          fn: request,
          fnArgument: requestConfig
        })
      ).rejects.toThrow();

      keepCalling = !mock.isDone();
    }
    expect(circuitBreakers[`${host}::myTestTenant`].opened).toBe(false);
  }, 15000);

  it('creates circuit breaker for each tenant', async () => {
    nock(host, {}).get(/ok/).times(2).reply(200);

    const requestConfig: RawAxiosRequestConfig = {
      method: 'get',
      baseURL: host,
      url: 'ok'
    };
    const context: MiddlewareContext<RawAxiosRequestConfig> = {
      uri: host,
      tenantId: 'tenant1'
    };

    await executeWithMiddleware<
      RawAxiosRequestConfig,
      AxiosResponse,
      MiddlewareContext<RawAxiosRequestConfig>
    >([circuitBreaker()], {
      context,
      fn: request,
      fnArgument: requestConfig
    });
    await executeWithMiddleware<
      RawAxiosRequestConfig,
      AxiosResponse,
      MiddlewareContext<RawAxiosRequestConfig>
    >([circuitBreaker()], {
      context: { ...context, tenantId: 'tenant2' },
      fn: request,
      fnArgument: requestConfig
    });

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

    const requestConfigPath1: RawAxiosRequestConfig = {
      method: 'get',
      baseURL: host,
      url: 'path-1'
    };
    const requestConfigPath2: RawAxiosRequestConfig = {
      method: 'get',
      baseURL: host,
      url: 'path-2'
    };
    const context: (
      requestConfig: RawAxiosRequestConfig
    ) => MiddlewareContext<RawAxiosRequestConfig> = requestConfig => ({
      fnArgument: requestConfig,
      uri: host,
      tenantId: 'tenant1'
    });

    await executeWithMiddleware<
      RawAxiosRequestConfig,
      AxiosResponse,
      MiddlewareContext<RawAxiosRequestConfig>
    >([circuitBreaker()], {
      context: context(requestConfigPath1),
      fn: request,
      fnArgument: requestConfigPath1
    });
    await executeWithMiddleware<
      RawAxiosRequestConfig,
      AxiosResponse,
      MiddlewareContext<RawAxiosRequestConfig>
    >([circuitBreaker()], {
      context: context(requestConfigPath2),
      fn: request,
      fnArgument: requestConfigPath2
    });

    expect(Object.keys(circuitBreakers)).toEqual([`${host}::tenant1`]);
  });

  it('does not open breaker for 401 xsuaa failures', async () => {
    const mock = nock(host, {})
      .post(/oauth\/token/)
      .times(10)
      .reply(401);

    const requestConfig: RawAxiosRequestConfig = {
      method: 'post',
      baseURL: host,
      url: '/oauth/token',
      data: {
        client_id: 'client_id',
        client_secret: 'wrong_client_secret',
        grant_type: 'client_credentials'
      }
    };
    const context: MiddlewareContext<RawAxiosRequestConfig> = {
      uri: host,
      tenantId: 'myTestTenant'
    };

    let keepCalling = !mock.isDone();
    while (keepCalling) {
      await expect(
        executeWithMiddleware<
          RawAxiosRequestConfig,
          AxiosResponse,
          MiddlewareContext<RawAxiosRequestConfig>
        >([circuitBreaker()], {
          context,
          fn: request,
          fnArgument: requestConfig
        })
      ).rejects.toThrowError(/Request failed with status code 401/);
      keepCalling = !mock.isDone();
    }
    expect(circuitBreakers[`${host}::myTestTenant`].opened).toBe(false);
  });
});
