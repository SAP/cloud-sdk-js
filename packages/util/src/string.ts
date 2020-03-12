/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
export function encodeBase64(str: string): string {
  return Buffer.from(str).toString('base64');
}
