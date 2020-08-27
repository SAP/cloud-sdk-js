/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { MapType } from '@sap-cloud-sdk/util';

/**
 * Extractor for the etag for OData v4 responses used in [[entityDeserializer]].
 * @param json - Reponse data from which the etag is extracted
 * @returns The etag
 */
export function extractODataEtagV4(json: MapType<any>): string | undefined {
  return '@odata.etag' in json ? json['@odata.etag'] : undefined;
}
