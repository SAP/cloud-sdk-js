import { readFileSync } from 'fs';
import { Algorithm, sign } from 'jsonwebtoken';
import { resolve } from 'path';

export function privateKey(filename: string = 'test'): string {
  return readFileSync(resolve(__dirname, `../test-res/${filename}`), {
    encoding: 'utf8'
  });
}

export function publicKey(filename: string = 'test.pub'): string {
  return readFileSync(resolve(__dirname, `../test-res/${filename}`), {
    encoding: 'utf8'
  });
}

export function signedJwt(payload, filename: string = 'test', algorithm: Algorithm = 'RS512') {
  return sign(payload, privateKey(filename), {
    algorithm
  });
}
