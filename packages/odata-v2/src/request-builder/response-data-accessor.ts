import { createLogger } from '@sap-cloud-sdk/util';
import { ResponseDataAccessor } from '@sap-cloud-sdk/odata-common';

const logger = createLogger({
  package: 'core',
  messageContext: 'response-data-accessor'
});

/**
 * Methods to extract the data from OData v2 responses.
 */

/**
 * Extract the collection data from the response.
 * If the data does not contain a collection an empty array is returned.
 * @param data - Response of the OData v2 service
 * @returns any[] - Collection extracted from the response
 *  @internal
 */
export function getCollectionResult(data: any): any[] {
  validateCollectionResult(data);
  return isCollectionResult(data) ? data?.d?.results : [];
}

/**
 * Checks if the data contains a collection result.
 * @param data - Response of the OData service.
 * @returns `true`, if the data is a collection result.
 *  @internal
 */
export function isCollectionResult(data: any): boolean {
  return Array.isArray(data?.d?.results);
}

function validateCollectionResult(data: any): void {
  if (!isCollectionResult(data)) {
    logger.warn(
      'The given response data does not have the standard OData v2 format for collections.'
    );
  }
}

/**
 * Extract the collection data from the one to many link response.
 * If the data does not contain a collection an empty array is returned.
 * @param data - Response of the one to many link
 * @returns any[] - Collection extracted from the response
 *  @internal
 */
export function getLinkedCollectionResult(data: any): any[] {
  if (Array.isArray(data?.results)) {
    return data.results;
  }
  return Array.isArray(data) ? data : [];
}

/**
 * Parses the data of a single result.
 * @param data - Response of the OData service.
 * @returns The single result object if existent, an empty object otherwise.
 * @internal
 */
export function getSingleResult(data: any): Record<string, any> {
  validateSingleResult(data);
  return isSingleResultAsCollection(data) ? data?.d?.results : data?.d || {};
}

// Workaround to be compatible with services that wrongly implement the OData v2 protocol and serve single responses in the same format as collections
function isSingleResultAsCollection(data: any): boolean {
  return !!data?.d?.results && !isCollectionResult(data);
}

function validateSingleResult(data: any): void {
  if (isSingleResultAsCollection(data)) {
    logger.warn(
      'The given response data has the format for collections instead of the standard OData v2 format for single results.'
    );
  }
  if (!data?.d) {
    logger.warn(
      'The given response data does not have the standard OData v2 format for single results.'
    );
  }
}

/**
 * @internal
 */
export const responseDataAccessor: ResponseDataAccessor = {
  getCollectionResult,
  getLinkedCollectionResult,
  getSingleResult,
  isCollectionResult
};
