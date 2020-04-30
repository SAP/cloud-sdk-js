/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable } from './constructable';
import { Entity } from './entity';
import { tsToEdm } from './payload-value-converter';
import {
  CollectionField,
  ComplexTypeField,
  EdmTypeField,
  Link,
  OneToOneLink
} from './selectable';
import { toStaticPropertyFormat } from './util';

/**
 * Converts an instance of an entity class into a JSON payload to be sent to an OData service.
 *
 * @param entity - An instance of an entity.
 * @param entityConstructor - The constructor function of that entity.
 * @returns JSON.
 */
export function serializeEntity<EntityT extends Entity>(
  entity: EntityT,
  entityConstructor: Constructable<EntityT>
): MapType<any> {
  return {
    ...serializeEntityNonCustomFields(entity, entityConstructor),
    ...entity.getCustomFields()
  };
}

export function serializeEntityODataV4<EntityT extends Entity>(
  entity: EntityT,
  entityConstructor: Constructable<EntityT>
): MapType<any> {
  return {
    ...serializeEntityNonCustomFieldsODataV4(entity, entityConstructor),
    ...entity.getCustomFields()
  };
}

/**
 * Converts an instance of an entity class into a JSON payload to be sent to an OData service, ignoring custom fields.
 *
 * @param entity - An instance of an entity.
 * @param entityConstructor - The constructor function of that entity.
 * @returns JSON.
 */
export function serializeEntityNonCustomFields<EntityT extends Entity>(
  entity: EntityT,
  entityConstructor: Constructable<EntityT>
): MapType<any> {
  if (!entity) {
    return {};
  }
  return Object.keys(entity).reduce((serialized, key) => {
    const selectable = entityConstructor[toStaticPropertyFormat(key)];
    const fieldValue = entity[key];
    if (isODataV2Serizable(fieldValue, selectable)) {
      serialized[selectable._fieldName] = serializeField(
        fieldValue,
        selectable
      );
    }

    return serialized;
  }, {});
}

export function serializeEntityNonCustomFieldsODataV4<EntityT extends Entity>(
  entity: EntityT,
  entityConstructor: Constructable<EntityT>
): MapType<any> {
  if (!entity) {
    return {};
  }
  return Object.keys(entity).reduce((serialized, key) => {
    const selectable = entityConstructor[toStaticPropertyFormat(key)];
    const fieldValue = entity[key];

    if (isODataV2Serizable(fieldValue, selectable)) {
      serialized[selectable._fieldName] = serializeField(
        fieldValue,
        selectable
      );
    } else if (selectable instanceof CollectionField) {
      serialized[selectable._fieldName] = serilizeCollectionField(
        fieldValue,
        selectable
      );
    }

    return serialized;
  }, {});
}

function serilizeCollectionField<EntityT extends Entity>(
  fieldValue: any[],
  selectable: CollectionField<EntityT>
) {
  if (selectable._elementType instanceof EdmTypeField) {
    const edmType = selectable._elementType.edmType;
    return fieldValue.map(v => tsToEdm(v, edmType));
  } else if (selectable._elementType instanceof ComplexTypeField) {
    const complexTypeField = selectable._elementType;
    return fieldValue.map(v => serializeComplexTypeField(complexTypeField, v));
  }
}

function isODataV2Serizable(fieldValue, selectable) {
  return (
    fieldValue === null ||
    fieldValue === undefined ||
    selectable instanceof EdmTypeField ||
    selectable instanceof OneToOneLink ||
    selectable instanceof Link ||
    selectable instanceof ComplexTypeField
  );
}

function serializeField(fieldValue, selectable) {
  if (fieldValue === null || fieldValue === undefined) {
    return null;
  } else if (selectable instanceof EdmTypeField) {
    return tsToEdm(fieldValue, selectable.edmType);
  } else if (selectable instanceof OneToOneLink) {
    return serializeEntityNonCustomFields(fieldValue, selectable._linkedEntity);
  } else if (selectable instanceof Link) {
    return fieldValue.map(linkedEntity =>
      serializeEntityNonCustomFields(linkedEntity, selectable._linkedEntity)
    );
  } else if (selectable instanceof ComplexTypeField) {
    return serializeComplexTypeField(selectable, fieldValue);
  }
}

function serializeComplexTypeField<EntityT extends Entity>(
  selectable: ComplexTypeField<EntityT>,
  fieldValue: any
): any {
  return Object.entries(selectable).reduce(
    (complexTypeObject, [propertyKey, propertyValue]) => {
      const value = fieldValue[propertyKey];
      if (
        propertyValue instanceof EdmTypeField &&
        typeof value !== 'undefined'
      ) {
        complexTypeObject[propertyValue._fieldName] = tsToEdm(
          fieldValue[propertyKey],
          propertyValue.edmType
        );
      }
      return complexTypeObject;
    },
    {}
  );
}
