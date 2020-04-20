/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { MapType } from '@sap-cloud-sdk/util';

export function isNullish(x: any): x is null | undefined {
  return x === null || x === undefined;
}

export function toHeaderObject(key: string, value: any): MapType<any> {
  return isNullish(value) ? {} : { [key]: value };
}

export function getHeader(
  key: string,
  headers: MapType<any> = {}
): MapType<any> {
  const entry = Object.entries(headers).find(
    ([entryKey]) => entryKey.toLowerCase() === key.toLowerCase()
  );
  return entry ? { [entry[0]]: entry[1] } : {};
}

export function getHeaderValue(
  key: string,
  headers: MapType<any> = {}
): any | undefined {
  return Object.entries(headers).find(
    ([entryKey]) => entryKey.toLowerCase() === key.toLowerCase()
  )?.[1];
}

export function filterNullishValues(headers: MapType<any> = {}): MapType<any> {
  return Object.entries(headers)
    .filter(([_, value]) => !isNullish(value))
    .reduce((filtered, [key, value]) => ({ ...filtered, [key]: value }), {});
}

export function replaceDuplicateKeys(
  headers: MapType<any> = {},
  customHeaders: MapType<any> = {}
): MapType<any> {
  return Object.entries(headers)
    .map(([key, value]) =>
      getHeaderValue(key, customHeaders)
        ? getHeader(key, customHeaders)
        : { [key]: value }
    )
    .reduce((replaced, header) => ({ ...replaced, ...header }), {});
}
