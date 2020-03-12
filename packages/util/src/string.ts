/*!
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */

/**
 * Encodes the given string in base64.
 *
 * @param str - Input string.
 * @returns Base64 string.
 */
export function encodeBase64(str: string): string {
  return Buffer.from(str).toString('base64');
}
