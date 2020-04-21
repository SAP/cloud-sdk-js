/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export function isNullish(x: any): x is null | undefined {
  return x === null || x === undefined;
}
