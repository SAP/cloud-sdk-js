/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

/**
 * Username/Password pair used as client credentials.
 */
export interface ClientCredentials {
  username: string;
  password: string;
}

/**
 * @hidden
 */
export interface ClientCredentialsResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
}

/**
 * @hidden
 */
export interface UserTokenResponse extends ClientCredentialsResponse {
  refresh_token: string;
}

/**
 * Response element returned from the XSUAA service's /token_key endpoint.
 * Value holds the key that is used for verifying JWTs.
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
