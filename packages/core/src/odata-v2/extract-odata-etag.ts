/**
 * Extractor for the etag for OData v2 responses used in [[entityDeserializer]].
 * @param json - Response data from which the etag is extracted
 * @returns The etag
 */
export function extractODataEtag(
  json: Record<string, any>
): string | undefined {
  return json?.__metadata?.etag;
}

export { extractODataEtag as extractODataEtagV2 };
