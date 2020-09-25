/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { createLogger } from '@sap-cloud-sdk/util';
import { ResponseDataAccessor } from '../../common/response-data-accessor';

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
 */
export function getCollectionResult(data): any[] {
  validateCollectionResult(data);
  return isCollectionResult(data) ? data?.d?.results : [];
}

/**
 * Checks if the data contains a collection result.
 * @param data - Response of the OData v2 service
 * @returns boolean - true if the data is a collection result
 */
export function isCollectionResult(data): boolean {
  return Array.isArray(data?.d?.results);
}

function validateCollectionResult(data): void {
  if (!isCollectionResult(data)) {
    logger.warn(
      'The given reponse data does not have the standard OData v2 format for collections.'
    );
  }
}

/**
 * Extract the collection data from the one to many link response.
 * If the data does not contain a collection an empty array is returned.
 * @param data - Response of the one to many link
 * @returns any[] - Collection extracted from the response
 */
export function getLinkedCollectionResult(data): any[] {
  if (Array.isArray(data?.results)) {
    return data.results;
  }
  return Array.isArray(data) ? data : [];
}

/**
 * Checks if the data contains a collection result.
 * @param data - Response of the OData v2 service
 * @returns boolean - true if the data is a collection result
 */
export function getSingleResult(data): Record<string, any> {
  validateSingleResult(data);
  return isSingleResultAsCollection(data) ? data?.d?.results : data?.d || {};
}

// Workaround to be compatible with services that wrongly implement the OData v2 protocol and serve single responses in the same format as collections
function isSingleResultAsCollection(data): boolean {
  return !!data?.d?.results && !isCollectionResult(data);
}

function validateSingleResult(data): void {
  if (isSingleResultAsCollection(data)) {
    logger.warn(
      'The given reponse data has the format for collections instead of the standard OData v2 format for single results.'
    );
  }
  if (!data?.d) {
    logger.warn(
      'The given reponse data does not have the standard OData v2 format for single results.'
    );
  }
}

export const responseDataAccessorV2: ResponseDataAccessor = {
  getCollectionResult,
  isCollectionResult,
  getSingleResult,
  getLinkedCollectionResult
};
