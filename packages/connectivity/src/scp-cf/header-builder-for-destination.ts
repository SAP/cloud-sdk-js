import {
  mergeIgnoreCase,
  mergeLeftIgnoreCase,
  pickNonNullish
} from '@sap-cloud-sdk/util';
import { getAuthHeaders } from './authorization-header';
import { Destination } from './destination';

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
