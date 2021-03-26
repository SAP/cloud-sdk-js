import {
  createLogger,
  ErrorWithCause,
  pickIgnoreCase,
  pickNonNullish,
  pickValueIgnoreCase
} from '@sap-cloud-sdk/util';
import { removeTrailingSlashes } from '../odata-common/remove-slashes';
import {
  Destination,
  DestinationNameAndJwt
} from '../connectivity/scp-cf/destination';
import { HttpRequestConfig } from './http-client-types';
import { executeHttpRequest } from './http-client';

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
  return executeHttpRequest(destination, appendSlash(axiosConfig))
    .then(response => response.headers)
    .catch(e1 => {
      logger.error(
        new ErrorWithCause(
          'Initial try to fetch CSRF token failed - retry without slash at ',
          e1
        )
      );
      return executeHttpRequest(destination, removeSlash(axiosConfig))
        .then(response => response.headers)
        .catch(e2 => {
          throw new ErrorWithCause(
            'Also second try to fetch SRF token failed - No CSRF token fetched.',
            e2
          );
        });
    });
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
