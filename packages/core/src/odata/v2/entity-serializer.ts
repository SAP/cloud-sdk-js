/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { entitySerializer } from '../common/entity-serializer';
import { tsToEdm } from './payload-value-converter';
const serializer = entitySerializer(tsToEdm, updateSerialized);

export const serializeEntity = serializer.serializeEntity;
export const serializeEntityNonCustomFields =
  serializer.serializeEntityNonCustomFields;

function updateSerialized(fieldValue, field, serialized) {
  if (serializer.isODataV2Serializable(fieldValue, field)) {
    serialized[field._fieldName] = serializer.serializeField(fieldValue, field);
  }
}
