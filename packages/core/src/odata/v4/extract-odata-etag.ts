/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

/**
 * Extractor for the etag for OData v4 responses used in [[entityDeserializer]].
 * @param json - Reponse data from which the etag is extracted
 * @returns The etag
 */
export function extractODataEtagV4(
  json: Record<string, any>
): string | undefined {
  return json ? json['@odata.etag'] : undefined;
}
