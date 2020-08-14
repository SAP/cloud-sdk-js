/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

/**
 * Data extractor for one to many links for v2 entity used in [[entityDeserializer]]
 * @param data - One to many link response data
 * @returns The content of the one to many link
 */
export function extractDataFromOneToManyLink(data): any[] | undefined {
  return data.results;
}
