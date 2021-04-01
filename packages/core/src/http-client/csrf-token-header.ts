import {
  createLogger,
  ErrorWithCause,
  pickIgnoreCase,
  pickNonNullish,
  pickValueIgnoreCase
} from '@sap-cloud-sdk/util';
import { AxiosError } from 'axios';
import { removeTrailingSlashes } from '../odata-common/remove-slashes';
import {
  Destination,
  DestinationNameAndJwt
} from '../connectivity/scp-cf/destination';
import { executeHttpRequest } from '../http-client';
import { HttpRequestConfig } from './http-client-types';

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
): Promise<Record<string, any>> {
  const csrfHeaders = await makeCsrfRequest(destination, requestConfig);
  validateCsrfTokenResponse(csrfHeaders);
  return pickNonNullish({
    ...pickIgnoreCase(csrfHeaders, 'x-csrf-token'),
    cookie: buildCookieHeaderValue(
      pickValueIgnoreCase(csrfHeaders, 'set-cookie')
    )
  });
}

function makeCsrfRequest<T extends HttpRequestConfig>(
  destination: Destination | DestinationNameAndJwt,
  requestConfig: Partial<T>
): Promise<Record<string, any>> {
  const fetchHeader = !pickValueIgnoreCase(
    requestConfig.headers,
    'x-csrf-token'
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

  // The S/4 does a redirect if the CSRF token is fetched in case the '/' is not in the URL.
  // TODO: remove once https://github.com/axios/axios/issues/3369 is really fixed. Issue is closed but problem stays.
  const requestConfigWithTrailingSlash = appendSlash(axiosConfig);
  return executeHttpRequest(destination, requestConfigWithTrailingSlash)
    .then(response => response.headers)
    .catch(error1 => {
      if (hasCsrfToken(error1)) {
        return getResponseHeadersFromAxiosError(error1);
      }
      logger.warn(
        new ErrorWithCause(
          `First attempt to fetch CSRF token failed with the url: ${requestConfigWithTrailingSlash.url}. Retrying without trailing slash.`,
          error1
        )
      );
      const requestConfigWithOutTrailingSlash = removeSlash(axiosConfig);
      return executeHttpRequest(destination, requestConfigWithOutTrailingSlash)
        .then(response => response.headers)
        .catch(error2 => {
          if (hasCsrfToken(error2)) {
            return getResponseHeadersFromAxiosError(error2);
          }
          logger.warn(
            new ErrorWithCause(
              `Second attempt to fetch CSRF token failed with the url: ${requestConfigWithOutTrailingSlash.url}. No CSRF token fetched.`,
              error2
            )
          );
          // todo suggest to disable csrf token handling when the api is implemented
          return {};
        });
    });
}

// In general, the valid csrf token head can also be found in a non-2xx request.
// For a non-2xx response, axios will throw an error so we have to check whether the error contains the token.
function hasCsrfToken(error: any): boolean {
  return error.isAxiosError && hasCsrfTokenInAxiosError(error);
}

function hasCsrfTokenInAxiosError(error: AxiosError): boolean {
  return error.response?.headers?.['x-csrf-token'];
}

function getResponseHeadersFromAxiosError(error: AxiosError) {
  return error.response!.headers;
}

function appendSlash(requestConfig: HttpRequestConfig): HttpRequestConfig {
  if (!requestConfig.url!.endsWith('/')) {
    requestConfig.url = `${requestConfig.url}/`;
  }
  return requestConfig;
}

function removeSlash(requestConfig: HttpRequestConfig): HttpRequestConfig {
  if (requestConfig.url!.endsWith('/')) {
    requestConfig.url = removeTrailingSlashes(requestConfig.url!);
  }
  return requestConfig;
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
