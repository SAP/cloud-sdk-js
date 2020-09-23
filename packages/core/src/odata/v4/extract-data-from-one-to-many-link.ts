/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

/**
 * Data extractor for one to many links for v4 entity used in [[entityDeserializer]]
 * @deprecated since version 1.28.2 use [[getOneToManyLinkResult]] instead
 * @param data - One to many link response data
 * @returns The content of the one to many link
 */
export function extractDataFromOneToManyLink(data): any[] | undefined {
  return data;
}
