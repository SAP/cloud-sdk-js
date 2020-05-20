/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { entityDeserializer } from '../common/entity-deserializer';
import { EntityBase, Field, Link } from '../common';
import { edmToTs } from './payload-value-converter';
const deserializer = entityDeserializer(edmToTs, getFieldValueV2);

export const extractCustomFields = deserializer.extractCustomFields;
export const deserializeEntity = deserializer.deserializeEntity;

function getFieldValueV2<EntityT extends EntityBase, JsonT>(
  json: Partial<JsonT>,
  field: Field<EntityT> | Link<EntityT>
) {
  if (deserializer.isODataV2Field(field)) {
    return deserializer.getFieldValue(json, field);
  }
}
