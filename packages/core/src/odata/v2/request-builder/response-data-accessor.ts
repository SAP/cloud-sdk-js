/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger({
  package: 'core',
  messageContext: 'response-data-accessor'
});

export function getCollectionResult(data): any[] {
  validateCollectionResult(data);
  return isCollectionResult(data) ? data?.d?.results : [];
}

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
