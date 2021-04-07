/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { unixEOL } from '@sap-cloud-sdk/util';

export function boxMessage(lines: string[]): string {
  const lineLength = lines.reduce(
    (prev, curr) => (prev < curr.length ? curr.length : prev),
    0
  );
  const sep = `+${[...Array(lineLength)].map(() => '-').join('')}+`;
  return ['', sep, ...lines.map(line => ` ${line} `), sep].join(unixEOL);
}
