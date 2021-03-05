import { getLinkedCollectionResult } from './request-builder/response-data-accessor';

/**
 * @deprecated Since v1.28.2. Use [[getLinkedCollectionResult]] instead.
 * Data extractor for one to many links for v2 entity used in [[entityDeserializer]]
 * @param data - One to many link response data
 * @returns The content of the one to many link
 */
export function extractDataFromOneToManyLink(data: any): any[] | undefined {
  return getLinkedCollectionResult(data);
}
