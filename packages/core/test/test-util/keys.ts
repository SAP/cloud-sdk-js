/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Algorithm, sign } from 'jsonwebtoken';

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

export function signedJwt(payload, filename = 'test', algorithm: Algorithm = 'RS512') {
  return sign(payload, privateKey(filename), {
    algorithm
  });
}
