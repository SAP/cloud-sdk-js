/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export function getCollectionResult(data): any[] {
  return data.value;
}

export function isCollectionResult(data): boolean {
  return Array.isArray(data.value);
}

export function getSingleResult(data): Record<string, any> {
  return data;
}
