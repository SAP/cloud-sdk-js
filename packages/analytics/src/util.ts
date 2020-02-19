/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import crypto from 'crypto';

/**
 * Generate a random salt.
 * @returns A random salt.
 * @hidden
 */
export function randomSalt(): string {
  // 1 byte will produce two bytes in hex string
  // 32 random bytes generate a hex string of the same bitlength as SHA-256
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create a hash for the given value.
 * @param value The value to hash.
 * @returns The hashed value.
 * @hidden
 */
export function hash(value: string): string {
  return crypto
    .createHash('sha256')
    .update(value)
    .digest('hex');
}
