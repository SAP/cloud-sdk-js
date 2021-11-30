/**
 * Create object containing all headers, including custom headers for a given  OData request configuration and destination.
 * Custom headers override duplicate headers.
 * @typeparam RequestT - Type of the request the headers are built for
 * @param request - OData request configuration to create headers for
 * @returns Key-value pairs where the key is the name of a header property and the value is the respective value
 */
import { OriginOptions } from '@sap-cloud-sdk/http-client/internal';
import { ODataRequest, ODataRequestConfig } from './request';

/**
 * Create Headers from request object.
 * @param request - Request from which header are build.
 * @returns The headers.
 * @internal
 */
export async function buildHeaders<RequestT extends ODataRequestConfig>(
  request: ODataRequest<RequestT>
): Promise<OriginOptions> {
  if (!request.destination) {
    throw Error('The request destination is undefined.');
  }

  return request.headers();
}
