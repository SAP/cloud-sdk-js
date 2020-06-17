/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

/**
 * Convenience type for JavaScript objects.
 */
export interface MapType<T> {
  [key: string]: T;
}

/**
 * Denotes the OData version.
 */
export type ODataVersion = 'v2' | 'v4';
