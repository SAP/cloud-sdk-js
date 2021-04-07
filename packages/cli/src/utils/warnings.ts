/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { unixEOL } from '@sap-cloud-sdk/util'

let warnings: string[][] = [];

export function recordWarning(...warn: string[]): void {
  warnings.push(warn);
}

export function getWarnings(): string[] | undefined {
  if (warnings.length > 0) {
    const result = warnings.map(warn => `- ${warn.join(`${unixEOL}  `)}`);
    warnings = [];
    return result;
  }
}
