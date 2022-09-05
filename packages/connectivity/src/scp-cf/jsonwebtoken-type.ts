/**
 * @internal
 * This is copied from `@types/jsonwebtoken`.
 */
export type Algorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'PS256'
  | 'PS384'
  | 'PS512'
  | 'none';

/**
 * This is copied from `@types/jsonwebtoken`.
 */
export interface JwtPayload {
  [key: string]: any;
  /**
   * Standard claims https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.
   */
  iss?: string | undefined;
  /**
   * Standard claims https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.
   */
  sub?: string | undefined;
  /**
   * Standard claims https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.
   */
  aud?: string | string[] | undefined;
  /**
   * Standard claims https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.
   */
  exp?: number | undefined;
  /**
   * Standard claims https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.
   */
  nbf?: number | undefined;
  /**
   * Standard claims https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.
   */
  iat?: number | undefined;
  /**
   * Standard claims https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.
   */
  jti?: string | undefined;
}

/**
 * @internal
 * This is copied from `@types/jsonwebtoken`.
 */
export interface JwtHeader {
  /**
   * @internal
   */
  alg: string | Algorithm;
  /**
   * @internal
   */
  typ?: string | undefined;
  /**
   * @internal
   */
  cty?: string | undefined;
  /**
   * @internal
   */
  crit?: (string | Exclude<keyof JwtHeader, 'crit'>)[] | undefined;
  /**
   * @internal
   */
  kid?: string | undefined;
  /**
   * @internal
   */
  jku?: string | undefined;
  /**
   * @internal
   */
  x5u?: string | string[] | undefined;
  /**
   * @internal
   */
  'x5t#S256'?: string | undefined;
  /**
   * @internal
   */
  x5t?: string | undefined;
  /**
   * @internal
   */
  x5c?: string | string[] | undefined;
}

/**
 * @internal
 * This is copied from `@types/jsonwebtoken`.
 */
export interface Jwt {
  /**
   * @internal
   */
  header: JwtHeader;
  /**
   * @internal
   */
  payload: JwtPayload | string;
  /**
   * @internal
   */
  signature: string;
}

/**
 * @internal
 */
export interface JwtWithPayloadObject {
  /**
   * @internal
   */
  header: JwtHeader;
  /**
   * @internal
   */
  payload: JwtPayload;
  /**
   * @internal
   */
  signature: string;
}
