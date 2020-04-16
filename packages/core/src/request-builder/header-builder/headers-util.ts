import { MapType } from "@sap-cloud-sdk/util";

export function isNullish(x: any): x is null | undefined {
  return x === null || x === undefined;
}

export function toHeaderObject(key: string, value: any): MapType<any> {
  return isNullish(value) ? {} : { [key]: value };
}

export function getHeaderValue(headers: MapType<any> = {}, headerKey: string): any | undefined {
  return Object.entries(headers).find(([key]) => key.toLowerCase() === headerKey.toLowerCase())?.[1];
}

export function filterNullishValues(headers: MapType<any> = {}): MapType<any> {
  return Object.entries(headers)
    .filter(([key, value]) => !isNullish(value))
    .reduce((filtered, [key, value]) => ({ ...filtered, [key]: value }), {});
}

export function filterDuplicateKeys(defaultHeaders: MapType<any> = {}, customHeaders: MapType<any> = {}): MapType<any> {
  return Object.entries(defaultHeaders)
    .filter(([key]) => !getHeaderValue(customHeaders, key))
    .reduce((filtered, [key, value]) => ({ ...filtered, [key]: value }), {});
}

export async function getHeaderByKeyOrExecute(fn, key: string, headers: MapType<any> = {}) {
  const defaultValue = getHeaderValue(headers, key);
  return isNullish(defaultValue) ? fn() : { [key]: defaultValue };
}

