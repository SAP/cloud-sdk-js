import { mergeLeftIgnoreCase, pickNonNullish } from '@sap-cloud-sdk/util';
import { Destination } from '../scp-cf';
import { getAuthHeaders } from './authorization-header';

export async function buildHeadersForDestination(
  destination: Destination,
  customHeaders?: Record<string, any>
): Promise<Record<string, string>> {
  const authHeaders = await getAuthHeaders(destination, customHeaders);

  const sapHeaders = mergeLeftIgnoreCase(
    pickNonNullish({
      'sap-client': destination.sapClient,
      'SAP-Connectivity-SCC-Location_ID': destination.cloudConnectorLocationId
    }),
    customHeaders
  );

  return { ...authHeaders, ...sapHeaders };
}
