import { generateKeyPairSync } from 'node:crypto';
import { Algorithm, JwtHeader, sign } from 'jsonwebtoken';

export const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem'
  }
});

const defaultJku = 'https://authentication.sap.hana.ondemand.com/token_keys';
export { defaultJku as jku };

export function signedJwt(payload, algorithm: Algorithm = 'RS512') {
  return sign(payload, privateKey, {
    algorithm
  });
}

export function signedXsuaaJwt(payload, algorithm: Algorithm = 'RS512') {
  return sign(
    { ...payload, ext_attr: { ...payload.ext_attr, enhancer: 'XSUAA' } },
    privateKey,
    {
      algorithm
    }
  );
}

export function signedJwtForVerification(
  payload: string | object | Buffer,
  jku: string | null = defaultJku,
  algorithm: Algorithm = 'RS256'
) {
  return sign(payload, privateKey, {
    header: { jku, kid: 'key-id-1' } as JwtHeader,
    algorithm
  });
}
