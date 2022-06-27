import {
  createLogger,
  first,
  pickIgnoreCase,
  pickValueIgnoreCase,
  removeTrailingSlashes
} from '@sap-cloud-sdk/util';
import { HttpRequestConfigBase } from './http-client-types';

const logger = createLogger({
  package: 'http-client',
  messageContext: 'csrf-token-header'
});

/**
 * @param headers - Request header information.
 * @returns CSRF related headers.
 * @internal
 */
export function buildCsrfFetchHeaders(headers: any): Record<string, any> {
  const fetchHeader = !pickValueIgnoreCase(headers, 'x-csrf-token') && {
    'x-csrf-token': 'Fetch'
  };

  const contentLengthHeaderKey =
    first(Object.keys(pickIgnoreCase(headers, 'content-length'))) ||
    'content-length';

  return {
    ...fetchHeader,
    ...headers,
    [contentLengthHeaderKey]: 0
  };
}

/**
 * @internal
 */
export function hasCsrfToken(headers: Record<string, any>): boolean {
  return !!headers['x-csrf-token'];
}

// Non-2xx responses can contain valid csrf tokens in their headers.
/**
 * @internal
 */
export function getResponseHeadersFromError(error: any): Record<string, any> {
  return error.response?.headers || {};
}

/**
 * @internal
 */
export function appendSlash<T extends HttpRequestConfigBase>(
  requestConfig: T
): T {
  if (!requestConfig.url!.endsWith('/')) {
    requestConfig.url = `${requestConfig.url}/`;
  }
  return requestConfig;
}

/**
 * @internal
 */
export function removeSlash<T extends HttpRequestConfigBase>(
  requestConfig: T
): T {
  if (requestConfig.url!.endsWith('/')) {
    requestConfig.url = removeTrailingSlashes(requestConfig.url!);
  }
  return requestConfig;
}

/**
 * @internal
 */
export function validateCsrfTokenResponse(
  responseHeaders: Record<string, any>
): Record<string, any> {
  if (!responseHeaders['x-csrf-token']) {
    logger.warn(
      'Destination did not return a CSRF token. This may cause a failure when sending the OData request.'
    );
  }

  if (!responseHeaders['set-cookie']) {
    logger.warn('CSRF header response does not include cookies.');
  }

  return responseHeaders;
}

/**
 * @internal
 */
export function buildCookieHeaderValue(cookies?: string[]): string | undefined {
  if (cookies && cookies.length) {
    return cookies.map((cookie: string) => cookie.split(';')[0]).join(';');
  }
}
