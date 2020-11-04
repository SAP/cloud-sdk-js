import { createLogger, errorWithCause } from '@sap-cloud-sdk/util';
import { AxiosError } from 'axios';
import { HttpRequestConfig, executeHttpRequest } from '../http-client';
import { Destination, DestinationNameAndJwt } from '../scp-cf';
import { filterNullishValues, getHeader, getHeaderValue } from './header-util';

const logger = createLogger({
  package: 'core',
  messageContext: 'csrf-token-header'
});

/**
 * Get CSRF token and cookies for a destination and request configuration. The CSRF token and cookies will be retrieved based on the url of the destination and the custom configuration given by the `requestConfig`.
 * If there is a relative url in the `requestConfig` it will be appended to the destination's url, an absolute url overwrites the destination related url.
 * @param destination The destination to get the headers from
 * @param requestConfig An http request configuration containing additional information about the request, like url or headers
 * @returns A promise to an object containing the CSRF related headers
 */
export async function buildCsrfHeaders<T extends HttpRequestConfig>(
  destination: Destination | DestinationNameAndJwt,
  requestConfig: Partial<T>
): Promise<Record<string, string>> {
  const csrfHeaders = await makeCsrfRequest(destination, requestConfig);
  validateCsrfTokenResponse(csrfHeaders);
  return filterNullishValues({
    ...getHeader('x-csrf-token', csrfHeaders),
    cookie: buildCookieHeaderValue(getHeaderValue('set-cookie', csrfHeaders))
  });
}

function makeCsrfRequest<T extends HttpRequestConfig>(
  destination: Destination | DestinationNameAndJwt,
  requestConfig: Partial<T>
): Promise<Record<string, any>> {
  const fetchHeader = !getHeaderValue(
    'x-csrf-token',
    requestConfig.headers
  ) && { 'x-csrf-token': 'Fetch' };
  const axiosConfig: HttpRequestConfig = {
    method: 'get',
    ...requestConfig,
    headers: {
      ...fetchHeader,
      ...requestConfig.headers
    },
    url: requestConfig.url
  };

  return executeHttpRequest(destination, axiosConfig)
    .then(response => response.headers)
    .catch(error => {
      if (!error.response) {
        // TODO: remove once https://github.com/axios/axios/issues/3369 is fixed
        const retry = axiosWorkaround(error, requestConfig, destination);
        if (retry) {
          return retry;
        }
        throw errorWithCause('Csrf fetch failed.', error);
      }
      return error.response.headers;
    });
}

function axiosWorkaround<T extends HttpRequestConfig>(
  error: AxiosError,
  axiosConfig: Partial<T>,
  destination: Destination | DestinationNameAndJwt
) {
  if (error.request?._isRedirect) {
    logger.warn(
      'Csrf fetch was redirected and failed. This might be a bug in the underlying request library (https://github.com/axios/axios/issues/3369).\nRetrying with full configuration.'
    );
    return makeCsrfRequest(destination, {
      ...axiosConfig,
      url: error.request?._options?.path
    });
  }
}

function validateCsrfTokenResponse(responseHeaders: Record<string, any>) {
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

function buildCookieHeaderValue(cookies?: string[]): string | undefined {
  if (cookies && cookies.length) {
    return cookies.map((cookie: string) => cookie.split(';')[0]).join(';');
  }
}
