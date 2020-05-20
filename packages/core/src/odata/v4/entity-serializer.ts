/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { entitySerializer } from '../common/entity-serializer';
import { tsToEdm } from './payload-value-converter';
import { ComplexTypeField, EdmTypeField, EntityBase } from '../common';
import { CollectionField } from './selectable/collection-field';
const serializer = entitySerializer(tsToEdm, updateSerialized);

export const serializeEntity = serializer.serializeEntity;
export const serializeEntityNonCustomFields =
  serializer.serializeEntityNonCustomFields;

function updateSerialized(fieldValue, field, serialized){
  if(serializer.isODataV2Serializable(fieldValue, field)){
    serialized[field._fieldName] = serializer.serializeField(fieldValue, field);
  } else if (field instanceof CollectionField) {
    serialized[field._fieldName] = serializeCollectionField(fieldValue, field);
  }
}

function serializeCollectionField<EntityT extends EntityBase>(
  fieldValue: any[],
  selectable: CollectionField<EntityT>
) {
  if (selectable._elementType instanceof EdmTypeField) {
    const edmType = selectable._elementType.edmType;
    return fieldValue.map(v => tsToEdm(v, edmType));
  } else if (selectable._elementType instanceof ComplexTypeField) {
    const complexTypeField = selectable._elementType;
    return fieldValue.map(v => serializer.serializeComplexTypeField(complexTypeField, v));
  }
}
