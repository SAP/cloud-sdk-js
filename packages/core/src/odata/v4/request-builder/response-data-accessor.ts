/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger({
  package: 'core',
  messageContext: 'response-data-accessor'
});

export function getCollectionResult(data): any[] {
  validateCollectionResult(data);
  return isCollectionResult(data) ? data.value : [];
}

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
