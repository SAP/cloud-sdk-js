/**
 * @internal
 * This is a copied from @types/jsonwebtoken.
 */
export type Algorithm =
  'HS256' | 'HS384' | 'HS512' |
  'RS256' | 'RS384' | 'RS512' |
  'ES256' | 'ES384' | 'ES512' |
  'PS256' | 'PS384' | 'PS512' |
  'none';

/**
 * This is a copied from @types/jsonwebtoken.
 */
export interface JwtPayload {
  [key: string]: any;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
}

/**
 * @internal
 * This is a copied from @types/jsonwebtoken.
 */
export interface JwtHeader {
  alg: string | Algorithm;
  typ?: string | undefined;
  cty?: string | undefined;
  crit?: (string | Exclude<keyof JwtHeader, 'crit'>)[] | undefined;
  kid?: string | undefined;
  jku?: string | undefined;
  x5u?: string | string[] | undefined;
  'x5t#S256'?: string | undefined;
  x5t?: string | undefined;
  x5c?: string | string[] | undefined;
}

/**
 * @internal
 * This is a copied from @types/jsonwebtoken.
 */
export interface Jwt {
  header: JwtHeader;
  payload: JwtPayload;
  signature: string;
}
