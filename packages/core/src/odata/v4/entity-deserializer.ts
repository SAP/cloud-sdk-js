/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { entityDeserializer } from '../common/entity-deserializer';
import { edmToTs } from './payload-value-converter';
import { ComplexTypeField, EdmTypeField, EntityBase, Field, Link } from '../common';
import { CollectionField } from './selectable/collection-field';
const deserializer = entityDeserializer(edmToTs, getFieldValueV4);

export const extractCustomFields = deserializer.extractCustomFields;
export const deserializeEntity = deserializer.deserializeEntity;

function getFieldValueV4<EntityT extends EntityBase, JsonT>(
  json: Partial<JsonT>,
  field: Field<EntityT> | Link<EntityT>
) {
  if(deserializer.isODataV2Field(field)){
    return deserializer.getFieldValue(json, field);
  } else if (field instanceof CollectionField) {
    return deserializeCollectionType(json[field._fieldName], field);
  }
}

function deserializeCollectionType<EntityT extends EntityBase>(
  json: any[],
  selectable: CollectionField<EntityT>
) {
  if (selectable._elementType instanceof EdmTypeField) {
    const edmType = selectable._elementType.edmType;
    return json.map(v => edmToTs(v, edmType));
  } else if (selectable._elementType instanceof ComplexTypeField) {
    const complexTypeField = selectable._elementType;
    return json.map(v => deserializer.deserializeComplexType(v, complexTypeField));
  }
}
