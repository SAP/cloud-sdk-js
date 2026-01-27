import {
  createLogger,
  ErrorWithCause,
  first,
  flatten,
  pickIgnoreCase,
  pickValueIgnoreCase,
  removeTrailingSlashes
} from '@sap-cloud-sdk/util';
import axios from 'axios';
import { executeWithMiddleware } from '@sap-cloud-sdk/resilience/internal';
import type {
  HttpMiddleware,
  HttpMiddlewareContext,
  HttpMiddlewareOptions,
  HttpRequestConfig,
  HttpRequestConfigBase,
  HttpRequestConfigWithOrigin,
  Method
} from './http-client-types';

const logger = createLogger('csrf-middleware');

/**
 * Options for middleware to fetch CSRF tokens.
 */
export interface CsrfMiddlewareOptions {
  /**
   * Method used for the token fetching. Default is `head`.
   */
  method?: Method;
  /**
   * URL used for the token fetching. Default is the resource path without parameters.
   */
  url?: string;
  /**
   * Middlewares added to the token retrieval request.
   */
  middleware?: HttpMiddleware[];
}

/**
 * Middleware for fetching a CSRF token. This middleware is added to all request per default.
 * Use the `fetchCsrfToken` option to disable it.
 * @param options - Options like URL or method to configure the token fetching.
 * @returns The middleware for fetching CSRF tokens.
 */
export function csrf(options?: CsrfMiddlewareOptions): HttpMiddleware {
  return (middlewareOptions: HttpMiddlewareOptions) => async requestConfig => {
    if (!needsCsrfToken(requestConfig)) {
      return middlewareOptions.fn(requestConfig);
    }
    const csrfToken = await makeCsrfRequests(requestConfig, {
      ...options,
      ...middlewareOptions
    });
    if (csrfToken?.cookie) {
      csrfToken.cookie = requestConfig.headers?.cookie
        ? [requestConfig.headers?.cookie, csrfToken?.cookie].join(';')
        : csrfToken?.cookie;
    }
    requestConfig.headers = { ...requestConfig.headers, ...csrfToken };
    return middlewareOptions.fn(requestConfig);
  };
}

function needsCsrfToken(requestConfig: HttpRequestConfig): boolean {
  if (requestConfig.method.toLowerCase() === 'get') {
    logger.debug('Method is GET no CSRF token needed.');
    return false;
  }

  if (pickValueIgnoreCase(requestConfig.headers, 'x-csrf-token')) {
    logger.debug(
      'CSRF token header was already provided. Existing token used.'
    );
    return false;
  }

  return true;
}

function appendSlash<T extends HttpRequestConfigBase>(requestConfig: T): T {
  if (!requestConfig.url) {
    requestConfig.url = '/';
  } else if (!requestConfig.url.endsWith('/')) {
    requestConfig.url = `${requestConfig.url}/`;
  }
  return requestConfig;
}

function removeSlash<T extends HttpRequestConfigBase>(requestConfig: T): T {
  if (requestConfig.url!.endsWith('/')) {
    requestConfig.url = removeTrailingSlashes(requestConfig.url!);
  }
  return requestConfig;
}

function getCsrfToken(headers: Record<string, any>): string | undefined {
  return Object.values(pickIgnoreCase(headers, 'x-csrf-token'))[0];
}

function getSetCookieHeader(headers: Record<string, any>): string | undefined {
  const cookies = Object.values(pickIgnoreCase(headers, 'set-cookie'));
  // On cookie format: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
  return flatten(cookies)
    .map((cookie: string) => cookie.split(';')[0])
    .join(';');
}

/**
 * @param headers - Request header information.
 * @returns CSRF related headers.
 * @internal
 */
export function buildCsrfFetchHeaders(headers: any): Record<string, any> {
  const contentLengthHeaderKey =
    first(Object.keys(pickIgnoreCase(headers, 'content-length'))) ||
    'content-length';

  return {
    'x-csrf-token': 'Fetch',
    ...headers,
    [contentLengthHeaderKey]: 0
  };
}

async function makeCsrfRequest(
  requestConfig: HttpRequestConfig,
  options: CsrfMiddlewareOptions & { context: HttpMiddlewareContext }
): Promise<CsrfHeaderWithCookie | undefined> {
  try {
    const response = await executeWithMiddleware(options.middleware, {
      fn: axios.request,
      fnArgument: requestConfig,
      context: options.context
    });
    return findCsrfHeader(response.headers);
  } catch (error) {
    // Avoid repeat CSRF attempts if request was cancelled
    if (error.code === 'ERR_CANCELED') {
      throw error;
    }

    if (findCsrfHeader(error.response?.headers)) {
      return findCsrfHeader(error.response?.headers);
    }
    logger.warn(
      new ErrorWithCause(
        `Failed to get CSRF token from  URL: ${requestConfig.url}.`,
        error
      )
    );
  }
}

function findCsrfHeader(
  headers: Record<string, any> | undefined
): CsrfHeaderWithCookie | undefined {
  if (!headers) {
    return;
  }

  const csrfHeader = getCsrfToken(headers);
  if (!csrfHeader) {
    return;
  }
  const cookieHeader = getSetCookieHeader(headers)
    ? { cookie: getSetCookieHeader(headers) }
    : {};
  return { 'x-csrf-token': csrfHeader, ...cookieHeader };
}

async function makeCsrfRequests(
  requestConfig: HttpRequestConfig,
  options: CsrfMiddlewareOptions & { context: HttpMiddlewareContext }
): Promise<CsrfHeaderWithCookie | undefined> {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    data,
    params,
    parameterEncoder,
    signal,
    ...requestConfigWithoutData
  } = requestConfig;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const axiosConfig: HttpRequestConfigWithOrigin = {
    ...requestConfigWithoutData,
    method: options.method || 'head',
    url: options.url || requestConfig.url,
    headers: buildCsrfFetchHeaders(requestConfig.headers),
    signal
  };

  // If the user set the URL to fetch the token we only do
  if (options.url) {
    return makeCsrfRequest(axiosConfig, options);
  }

  // The S/4 does a redirect if the CSRF token is fetched in case the '/' is not in the URL.
  // TODO: remove once https://github.com/axios/axios/issues/3369 is really fixed. Issue is closed but problem stays.
  // We try first with slash and then without
  /* eslint-disable no-return-await */
  return (
    (await makeCsrfRequest(appendSlash(axiosConfig), options)) ??
    (await makeCsrfRequest(removeSlash(axiosConfig), options))
  );
}

interface CsrfHeaderWithCookie {
  'x-csrf-token': string;
  cookie?: string;
}
