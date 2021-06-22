import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Algorithm, JwtHeader, sign } from 'jsonwebtoken';

export function privateKey(filename = 'test'): string {
  return readFileSync(resolve(__dirname, `../test-res/${filename}`), {
    encoding: 'utf8'
  });
}

export function publicKey(filename = 'test.pub'): string {
  return readFileSync(resolve(__dirname, `../test-res/${filename}`), {
    encoding: 'utf8'
  });
}

export function signedJwt(
  payload,
  filename = 'test',
  algorithm: Algorithm = 'RS512'
) {
  return sign(payload, privateKey(filename), {
    algorithm
  });
}

export function signedJwtForVerification(
  payload,
  jku,
  filename = 'test',
  algorithm: Algorithm = 'RS512'
) {
  return sign(payload, privateKey(filename), {
    header: { jku } as JwtHeader,
    algorithm
  });
}
