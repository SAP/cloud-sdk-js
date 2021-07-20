import {
  mergeIgnoreCase,
  mergeLeftIgnoreCase,
  pickNonNullish
} from '@sap-cloud-sdk/util';
import { Destination } from '../scp-cf';
import { getAuthHeaders } from './authorization-header';

export async function buildHeadersForDestination(
  destination: Destination,
  customHeaders?: Record<string, any>
): Promise<Record<string, string>> {
  const authHeaders = await getAuthHeaders(destination, customHeaders);

  const sapHeaders = getSapHeaders(destination, customHeaders);

  return mergeIgnoreCase(
    mergeLeftIgnoreCase(destination.headers, customHeaders),
    {
      ...authHeaders,
      ...sapHeaders
    }
  );
}

function getSapHeaders(
  destination: Destination,
  customHeaders?: Record<string, any>
): Record<string, string> {
  const defaultHeaders = pickNonNullish({
    'sap-client': destination.sapClient,
    'SAP-Connectivity-SCC-Location_ID': destination.cloudConnectorLocationId
  });
  const destinationHeaders = mergeLeftIgnoreCase(
    defaultHeaders,
    destination.headers
  );
  return mergeLeftIgnoreCase(destinationHeaders, customHeaders);
}
