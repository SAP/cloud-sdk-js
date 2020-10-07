import { Destination } from '../scp-cf';
import { getAuthHeaders } from './authorization-header';
import { replaceDuplicateKeys, filterNullishValues } from './header-util';

/**
 * Builds the authorization, proxy authorization and SAP headers for a given destination.
 *
 * @param destination - A destination.
 * @param customHeaders - Custom default headers for the resulting HTTP headers.
 * @returns HTTP headers for the given destination.
 */
export async function buildHeadersForDestination(
  destination: Destination,
  customHeaders?: Record<string, any>
): Promise<Record<string, string>> {
  const authHeaders = await getAuthHeaders(destination, customHeaders);

  const sapHeaders = replaceDuplicateKeys(
    filterNullishValues({
      'sap-client': destination.sapClient,
      'SAP-Connectivity-SCC-Location_ID': destination.cloudConnectorLocationId
    }),
    customHeaders
  );

  return { ...authHeaders, ...sapHeaders };
}
