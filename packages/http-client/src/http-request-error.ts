import { AxiosError } from 'axios';

/**
 * Typed error thrown by executeHttpRequest when the server
 * returns a non-2xx response. Surfaces the response body so
 * callers can inspect SAP OData/REST error payloads.
 */
export class HttpRequestError extends Error {
  readonly statusCode: number | undefined;
  readonly responseBody: unknown;
  readonly cause: AxiosError;

  constructor(axiosError: AxiosError) {
    const status = axiosError.response?.status;
    const body = axiosError.response?.data;
    const sapMessage = extractSapErrorMessage(body);
    const baseMessage = axiosError.message;

    super(
      sapMessage
        ? `Request failed with status ${status}: ${sapMessage}`
        : `Request failed with status ${status}: ${baseMessage}`
    );

    this.name = 'HttpRequestError';
    this.statusCode = status;
    this.responseBody = body;
    this.cause = axiosError;
  }
}

function extractSapErrorMessage(body: unknown): string | undefined {
  if (!body || typeof body !== 'object') return undefined;
  const err = (body as any)?.error;
  const msg = err?.message?.value ?? err?.message ?? err?.Message;
  return typeof msg === 'string' ? msg : undefined;
}