/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

/**
 * Data extractor for one to many links for v2 entity used in [[entityDeserializer]]
 * It first tries if data.result is an array and returns it.
 * Then it tires if data itself is an array and return it.
 * If both are not the case it returns undefined
 * @param data - One to many link response data
 * @returns The content of the one to many link
 */
export function extractDataFromOneToManyLink(data): any[] | undefined {
  if (data.results && Array.isArray(data.results)) {
    return data.results;
  }
  if (Array.isArray(data)) {
    return data;
  }
  return undefined;
}
