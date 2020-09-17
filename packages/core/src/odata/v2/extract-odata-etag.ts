/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { MapType } from '@sap-cloud-sdk/util';

/**
 * Extractor for the etag for OData v2 responses used in [[entityDeserializer]].
 * @param json - Response data from which the etag is extracted
 * @returns The etag
 */
export function extractODataEtagV2(json: MapType<any>): string | undefined {
  return json?.__metadata?.etag;
}
