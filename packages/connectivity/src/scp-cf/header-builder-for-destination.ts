import {
  mergeIgnoreCase,
  mergeLeftIgnoreCase,
  pickNonNullish
} from '@sap-cloud-sdk/util';
import { getAuthHeaders } from './authorization-header';
import { Destination } from './destination/destination-service-types';

/**
 * Build a request header object, that contains authentication headers and SAP specific headers like 'sap-client', from a given destination.
 * @param destination - The given destination that contains e.g., authentication and SAP client information.
 * @returns A request header object, built from the given destination.
 */
export async function buildHeadersForDestination(
  destination: Destination
): Promise<Record<string, string>> {
  const authHeaders = await getAuthHeaders(destination);
  const sapHeaders = getSapHeaders(destination);

  return mergeIgnoreCase(destination.headers, {
    ...authHeaders,
    ...sapHeaders
  });
}

function getSapHeaders(destination: Destination): Record<string, string> {
  const defaultHeaders = pickNonNullish({
    'sap-client': destination.sapClient,
    'SAP-Connectivity-SCC-Location_ID': destination.cloudConnectorLocationId
  });
  return mergeLeftIgnoreCase(defaultHeaders, destination.headers);
}
