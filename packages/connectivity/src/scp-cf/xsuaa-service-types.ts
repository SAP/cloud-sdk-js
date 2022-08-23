/**
 * Represents the response to a client credentials request.
 */
export interface ClientCredentialsResponse {
  /**
   * TODO-JSDOC.
   */
  access_token: string;
  /**
   * TODO-JSDOC.
   */
  token_type: string;
  /**
   * The number of seconds until the access token expires.
   */
  expires_in: number;
  /**
   * TODO-JSDOC.
   */
  scope: string;
  /**
   * TODO-JSDOC.
   */
  jti: string;
}

/**
 * @internal
 */
export interface UserTokenResponse extends ClientCredentialsResponse {
  /**
   * @internal
   */
  refresh_token: string;
}

/**
 * Response element returned from the XSUAA service's /token_key endpoint.
 * Value holds the key that is used for verifying JWTs.
 * @internal
 */
export interface TokenKey {
  /**
   * Key type, e.g. RSA.
   */
  keyType: string;

  /**
   * Encryption algorithm, e.g. RSA256.
   */
  algorithm: string;

  /**
   * ID of the key.
   */
  keyId: string;

  /**
   * The actual key.
   */
  value: string;

  /**
   * Public key use parameter - identifies intended use of the public key.
   */
  use: string;

  /**
   * RSA key modulus.
   */
  publicKeyModulus: string;

  /**
   * RSA key exponent.
   */
  publicKeyExponent: string;
}
