/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Destination } from '../scp-cf';
import { getAuthHeaders } from './authorization-header';
import { replaceDuplicateKeys, filterNullishValues } from './headers-util';

/**
 * Builds the authorization, proxy authorization and SAP headers for a given destination.
 *
 * @param destination - A destination.
 * @param customHeaders - Custom default headers for the resulting HTTP headers.
 * @returns HTTP headers for the given destination.
 */
export async function buildHeadersForDestination(
  destination: Destination,
  customHeaders?: MapType<any>
): Promise<MapType<string>> {
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
