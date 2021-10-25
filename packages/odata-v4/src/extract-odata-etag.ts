/**
 * Extractor for the ETag for OData v4 responses used in [[entityDeserializer]].
 * @param json - Response data from which the ETag is extracted.
 * @returns The ETag.
 */
export function extractODataEtag(
  json: Record<string, any>
): string | undefined {
  return json?.['@odata.etag'];
}
