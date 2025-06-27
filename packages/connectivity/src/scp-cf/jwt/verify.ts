/**
 * Options to control certain aspects of JWT verification behavior.
 * @deprecated This property is no longer used as the incoming JWT is not verified during destination retrieval.
 */
export interface VerifyJwtOptions {
  /**
   * The verification keys are cached if set to true.
   * @deprecated This property is no longer used as the incoming JWT is not verified during destination retrieval.
   */
  cacheVerificationKeys?: boolean;
}
