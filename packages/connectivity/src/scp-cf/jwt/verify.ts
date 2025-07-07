/**
 * Options to control certain aspects of JWT verification behavior.
 * @deprecated Since v4.0.3. This interface is no longer used as the incoming JWT is not verified during destination retrieval.
 */
export interface VerifyJwtOptions {
  /**
   * The verification keys are cached if set to true.
   * @deprecated Since v4.0.3. This property has no effect as the incoming JWT is no longer verified during destination retrieval.
   */
  cacheVerificationKeys?: boolean;
}
