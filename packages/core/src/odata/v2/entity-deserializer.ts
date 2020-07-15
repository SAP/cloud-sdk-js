/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { entityDeserializer } from '../common/entity-deserializer';
import { edmToTs } from './payload-value-converter';
import { extractODataETag } from './extract-odata-etag';
import { extractDataFromOneToManyLink } from './extract-data-from-one-to-many-link';
const deserializer = entityDeserializer(
  edmToTs,
  extractODataETag,
  extractDataFromOneToManyLink
);

export const extractCustomFields = deserializer.extractCustomFields;
export const deserializeEntity = deserializer.deserializeEntity;
