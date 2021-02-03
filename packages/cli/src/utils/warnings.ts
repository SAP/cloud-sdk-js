/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

let warnings: string[][] = [];

export function recordWarning(...warn: string[]) {
  warnings.push(warn);
}

export function getWarnings(): string[] | undefined {
  if (warnings.length > 0) {
    const result = warnings.map(warn => `- ${warn.join('\n  ')}`);
    warnings = [];
    return result;
  }
}
