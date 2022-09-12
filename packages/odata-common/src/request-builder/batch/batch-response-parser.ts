import {
  last,
  createLogger,
  pickValueIgnoreCase,
  ErrorWithCause,
  webEOL,
  unixEOL
} from '@sap-cloud-sdk/util';
import { HttpResponse } from '@sap-cloud-sdk/http-client';

const logger = createLogger({
  package: 'odata-common',
  messageContext: 'batch-response-parser'
});

/**
 * Detects the system dependent line break in a string.
 * @param str - The string to check for line breaks. Should have at least two lines, otherwise an error will be thrown.
 * @returns The system dependent line break
 * @internal
 */
export function detectNewLineSymbol(str: string): string {
  if (str.includes(webEOL)) {
    return webEOL;
  }
  if (str.includes(unixEOL)) {
    return unixEOL;
  }
  throw new Error('Cannot detect line breaks in the batch response body.');
}

/**
 * Get the response body from the string representation of a response.
 * @param response - String representation of a response.
 * @returns The response body as a one line string.
 * @internal
 */
export function getResponseBody(response: string): string {
  const newLineSymbol = detectNewLineSymbol(response);
  const lines = response.split(newLineSymbol);

  // A valid response should contain at least three lines, part id, empty line and response body.
  if (lines.length >= 3) {
    return lines[lines.length - 1];
  }

  throw Error(
    `Cannot parse batch subrequest response body. Expected at least three lines in the response, got ${lines.length}.`
  );
}

/**
 * Parse the headers in the string representation of a response headers into an object. This will only look at the highest level of headers.
 * @param response - String representation of a response.
 * @returns The headers as an object.
 */
function parseHeaders(response: string): Record<string, any> {
  const newLineSymbol = detectNewLineSymbol(response);
  // split on the first empty line
  const [responseHeaders] = response.split(newLineSymbol + newLineSymbol);
  return responseHeaders.split(newLineSymbol).reduce((headers, line) => {
    const [key, value] = line.split(':');
    return { ...headers, [key]: value?.trim() };
  }, {});
}

/**
 * Get the boundary from the content type header value. Throws an error if no boundary can be found.
 * @param contentType - Value of the content type header.
 * @returns The boundary.
 */
function getBoundary(contentType: string | undefined): string {
  const boundary = contentType?.match(/.*boundary=.+/)
    ? last(contentType.split('boundary='))
    : undefined;

  if (!boundary) {
    throw new Error('No boundary found.');
  }

  return boundary;
}

/**
 * Split a batch response into an array of sub responses for the retrieve requests and changesets.
 * @param response - The raw HTTP response.
 * @returns A list of sub responses represented as strings.
 * @internal
 */
export function splitBatchResponse(response: HttpResponse): string[] {
  const body = response.data.trim();
  if (!body) {
    return [];
  }

  try {
    const boundary = getBoundary(
      pickValueIgnoreCase(response.headers, 'content-type')
    );
    return splitResponse(body, boundary);
  } catch (err) {
    throw new ErrorWithCause('Could not parse batch response.', err);
  }
}

/**
 * Split a changeset (sub) response into an array of sub responses.
 * @param changeSetResponse - The string representation of a change set response.
 * @returns A list of sub responses represented as strings.
 * @internal
 */
export function splitChangeSetResponse(changeSetResponse: string): string[] {
  const headers = parseHeaders(changeSetResponse);

  try {
    const boundary = getBoundary(pickValueIgnoreCase(headers, 'content-type'));
    return splitResponse(changeSetResponse, boundary);
  } catch (err) {
    throw new ErrorWithCause('Could not parse change set response.', err);
  }
}

/**
 * Split a string representation of a response into sub responses given its boundary.
 * @param response - The string representation of the response to split.
 * @param boundary - The boundary to split by.
 * @returns A list of sub responses represented as strings.
 * @internal
 */
export function splitResponse(response: string, boundary: string): string[] {
  const newLineSymbol = detectNewLineSymbol(response);
  const parts = response.split(`--${boundary}`).map(part => {
    const trimmedPart = part.trim();
    return trimmedPart.includes('204 No Content') ||
      (trimmedPart.includes('200 OK') &&
        trimmedPart.includes('Content-Length: 0'))
      ? `${trimmedPart}${newLineSymbol}`
      : trimmedPart;
  });

  if (parts.length >= 3) {
    return parts.slice(1, parts.length - 1);
  }

  throw new Error(
    'Could not parse batch response body. Expected at least two response boundaries.'
  );
}

/**
 * Parse the HTTP code of response.
 * @param response - String representation of the response.
 * @returns The HTTP code.
 * @internal
 */
export function parseHttpCode(response: string): number {
  const group = response.match(/HTTP\/\d\.\d (\d{3}).*?/);

  if (group) {
    return parseInt(group[1].toString());
  }

  // The Trippin sample service returns this Unknown Status Code but if the @odata metadata is there we got data.
  if (response.match('Unknown Status Code') && response.match('@odata')) {
    logger.debug(
      "A batch request returned 'Unknown Status Code' but contained @odata annotation. Successful execution is assumed."
    );
    return 200;
  }

  throw new Error('Cannot parse http code of the response.');
}

/**
 * Get the body from the given response and parse it to JSON.
 * @param response - The string representation of a single response.
 * @returns The parsed JSON representation of the response body.
 * @internal
 */
function parseResponseBody(response: string): Record<string, any> {
  const responseBody = getResponseBody(response);
  if (responseBody) {
    try {
      return JSON.parse(responseBody);
    } catch (err) {
      logger.error(
        `Could not parse response body. Invalid JSON. Original Error: ${err}`
      );
    }
  }
  return {};
}

/**
 * Parse the body and http code of a batch sub response.
 * @param response - A batch sub response.
 * @returns The parsed response.s
 * @internal
 */
export function parseResponseData(response: string): ResponseData {
  return {
    body: parseResponseBody(response),
    httpCode: parseHttpCode(response)
  };
}

/**
 * Parse the complete batch HTTP response.
 * @param batchResponse - HTTP response of a batch request.
 * @returns An array of parsed sub responses of the batch response.
 * @internal
 */
export function parseBatchResponse(
  batchResponse: HttpResponse
): (ResponseData | ResponseData[])[] {
  return splitBatchResponse(batchResponse).map(response => {
    const contentType = pickValueIgnoreCase(
      parseHeaders(response),
      'content-type'
    );

    if (isChangeSetContentType(contentType)) {
      return splitChangeSetResponse(response).map(subResponse =>
        parseResponseData(subResponse)
      );
    }

    if (isRetrieveOrErrorContentType(contentType)) {
      return parseResponseData(response);
    }

    throw Error(
      `Cannot parse batch response. Unknown subresponse 'Content-Type' header '${contentType}'.`
    );
  });
}

function isChangeSetContentType(contentType: string): boolean {
  return contentType?.trim().startsWith('multipart/mixed');
}

function isRetrieveOrErrorContentType(contentType: string): boolean {
  return contentType?.trim().startsWith('application/http');
}

/**
 * Check if httpCode is in [200,300[ range.
 * @param httpCode - Code to be checked
 * @returns boolean
 * @internal
 */
export function isHttpSuccessCode(httpCode: number): boolean {
  return httpCode >= 200 && httpCode < 300;
}

/**
 * @internal
 */
export interface ResponseData {
  /**
   * @internal
   */
  body: Record<string, any>;
  /**
   * @internal
   */
  httpCode: number;
}
