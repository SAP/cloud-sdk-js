/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export function getCollectionResult(data): any[] | any {
  return data.d.results;
}

export function isCollectionResult(data): boolean {
  return Array.isArray(data.d.results);
}

export function getSingleResult(data): Record<string, any> {
  return isSingleResultAsCollection(data)
    ? getCollectionResult(data)
    : data?.d || {};
}

// Workaround to be compatible with services that wrongly implement the OData v2 protocol and serve single responses in the same format as collections
function isSingleResultAsCollection(data): boolean {
  return !!data.d?.results && !isCollectionResult(data);
}
