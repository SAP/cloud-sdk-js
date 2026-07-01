/**
 * Denotes the OData version.
 */
export type ODataVersion = 'v2' | 'v4';

/**
 * Returns the OData version in capital letters so V2 or V4.
 * @param oDataVersion - OData version in lower case: 'v2' or 'v4'.
 * @returns 'V2' or 'V4'.
 */
export function caps(oDataVersion: any): 'V2' | 'V4' {
  return oDataVersion ? oDataVersion.toUpperCase() : 'V2';
}

/**
 * A type which sets all properties of a generic type to `never`.
 * Used in the exclusive or type {@link Xor}.
 */
export type Without<T> = { [P in keyof T]?: never };

/**
 * Manual XOR between a destination and fetch options.
 *
 * `WithoutExclusive<T, U>` nevers every key of `T` that is NOT also in `U` — so the discriminators
 * shared by both branches stay accessible, while exclusive keys are correctly forbidden
 * on the opposite branch.
 */
export type WithoutExclusive<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never;
};

/**
 * XOR of two types containing keys with different names.
 * If the two types show an overlap the type is `never`.
 */
export type Xor<T, U> =
  | (WithoutExclusive<T, U> & U)
  | (WithoutExclusive<U, T> & T);
