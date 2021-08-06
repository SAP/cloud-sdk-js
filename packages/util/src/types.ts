/**
 * @deprecated Since v1.29.0. Use `Record<string, T>` instead.
 * Convenience type for JavaScript objects.
 */
export type MapType<T> = Record<string, T>;

/**
 * Denotes the OData version.
 */
export type ODataVersion = 'v2' | 'v4';

/**
 * Returns the OData version in capital letters so V2 or V4.
 * @param oDataVersion - OData version in lower case: 'v2' or 'v4'
 * @returns 'V2' or 'V4'
 */
export function caps(oDataVersion: any): 'V2' | 'V4' {
  return oDataVersion ? oDataVersion.toUpperCase() : 'V2';
}
