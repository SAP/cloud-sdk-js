/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export function getCollectionResult(data): any[] {
  return data.d.results;
}

export function getSingleResult(data): Record<string, any> {
  return isCollectionResponse(data) ? getCollectionResult(data) : data.d;
}

// Workaround to be compatible with services that wrongly implement the OData v2 protocol and serve single responses in the same format as collections
function isCollectionResponse(data): boolean {
  return data.d.results && Object.keys(data.d).length > 1;
}
