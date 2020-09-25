/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger({
  package: 'core',
  messageContext: 'response-data-accessor'
});

/**
 * Methods to extract the data from OData v4 responses.
 */

/**
 * Extract the collection data from the response.
 * If the data does not contain a collection an empty array is returned.
 * @param data - Response of the OData v4 service
 * @returns any[] - Collection extracted from the response
 */
export function getCollectionResult(data): any[] {
  validateCollectionResult(data);
  return isCollectionResult(data) ? data.value : [];
}

/**
 * Checks if the data contains a collection result.
 * @param data - Response of the OData v4 service
 * @returns boolean - true if the data is a collection result
 */
export function isCollectionResult(data): boolean {
  return Array.isArray(data.value);
}

function validateCollectionResult(data): void {
  if (!isCollectionResult(data)) {
    logger.warn(
      'The given reponse data does not have the standard OData v4 format for collections.'
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
  return Array.isArray(data) ? data : [];
}

/**
 * Extract the single entry data from the response.
 * If the data does not contain a single object an empty object is returned.
 * @param data - Response of the OData v4 service
 * @returns Record<string, any> - single object extracted from the response
 */
export function getSingleResult(data): Record<string, any> {
  validateSingleResult(data);
  return isSingleResult(data) ? data : {};
}

function isSingleResult(data): boolean {
  return typeof data === 'object' && !Array.isArray(data);
}

function validateSingleResult(data): void {
  if (!isSingleResult(data)) {
    logger.warn(
      'The given reponse data does not have the standard OData v4 format for single results.'
    );
  }
}
