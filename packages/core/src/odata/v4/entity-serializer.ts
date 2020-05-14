/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { toStaticPropertyFormat } from '../../util';
import {
  Constructable,
  EdmTypeField,
  OneToOneLink,
  Link,
  ComplexTypeField
} from '../common';
import { Entity } from './entity';
import { tsToEdm } from './payload-value-converter';

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
    const field = entityConstructor[toStaticPropertyFormat(key)];
    const fieldValue = entity[key];

    if (fieldValue === null || fieldValue === undefined) {
      serialized[field._fieldName] = null;
    } else if (field instanceof EdmTypeField) {
      serialized[field._fieldName] = tsToEdm(fieldValue, field.edmType);
    } else if (field instanceof OneToOneLink) {
      serialized[field._fieldName] = serializeEntityNonCustomFields(
        fieldValue,
        field._linkedEntity
      );
    } else if (field instanceof Link) {
      serialized[field._fieldName] = fieldValue.map(linkedEntity =>
        serializeEntityNonCustomFields(linkedEntity, field._linkedEntity)
      );
    } else if (field instanceof ComplexTypeField) {
      serialized[field._fieldName] = serializeComplexTypeField(
        field,
        fieldValue
      );
    }

    return serialized;
  }, {});
}

function serializeComplexTypeField<EntityT extends Entity>(
  complexTypeField: ComplexTypeField<EntityT>,
  fieldValue: any
): any {
  return Object.entries(complexTypeField).reduce(
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
