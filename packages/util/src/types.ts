/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

/**
 * @deprecated Since v1.29.0. Use Record<string, T> instead.
 * Convenience type for JavaScript objects.
 */
export interface MapType<T> {
  [key: string]: T;
}

/**
 * Denotes the OData version.
 */
export type ODataVersion = 'v2' | 'v4';

/**
 * Returns the OData version in capital letters so V2 or V4.
 * @param oDataVersion - OData version in lower case: 'v2' or 'v4'
 * @returns 'V2' or 'V4'
 */
export function caps(oDataVersion): 'V2' | 'V4' {
  return oDataVersion ? oDataVersion.toUpperCase() : 'V2';
}
