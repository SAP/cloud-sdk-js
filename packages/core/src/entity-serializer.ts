/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable } from './constructable';
import { Entity } from './entity';
import { tsToEdm } from './payload-value-converter';
import { ComplexTypeField, EdmTypeField, Link, OneToOneLink } from './selectable';
import { toStaticPropertyFormat } from './util';

/**
 * Converts an instance of an entity class into a JSON payload to be sent to an OData service.
 *
 * @param entity - An instance of an entity.
 * @param entityConstructor - The constructor function of that entity.
 * @returns JSON.
 */
export function serializeEntity<EntityT extends Entity>(entity: EntityT, entityConstructor: Constructable<EntityT>): MapType<any> {
  return { ...serializeEntityNonCustomFields(entity, entityConstructor), ...entity.getCustomFields() };
}

/**
 * Converts an instance of an entity class into a JSON payload to be sent to an OData service, ignoring custom fields.
 *
 * @param entity - An instance of an entity.
 * @param entityConstructor - The constructor function of that entity.
 * @returns JSON.
 */
export function serializeEntityNonCustomFields<EntityT extends Entity>(entity: EntityT, entityConstructor: Constructable<EntityT>): MapType<any> {
  if (!entity) {
    return {};
  }
  return Object.keys(entity).reduce((serialized, key) => {
    const selectable = entityConstructor[toStaticPropertyFormat(key)];
    const fieldValue = entity[key];

    if (fieldValue === null || fieldValue === undefined) {
      serialized[selectable._fieldName] = null;
    } else if (selectable instanceof EdmTypeField) {
      serialized[selectable._fieldName] = tsToEdm(fieldValue, selectable.edmType);
    } else if (selectable instanceof OneToOneLink) {
      serialized[selectable._fieldName] = serializeEntityNonCustomFields(fieldValue, selectable._linkedEntity);
    } else if (selectable instanceof Link) {
      serialized[selectable._fieldName] = fieldValue.map(linkedEntity => serializeEntityNonCustomFields(linkedEntity, selectable._linkedEntity));
    } else if (selectable instanceof ComplexTypeField) {
      serialized[selectable._fieldName] = serializeComplexTypeField(selectable, fieldValue);
    }

    return serialized;
  }, {});
}

function serializeComplexTypeField<EntityT extends Entity>(selectable: ComplexTypeField<EntityT>, fieldValue: any): any {
  return Object.entries(selectable).reduce((complexTypeObject, [propertyKey, propertyValue]) => {
    const value = fieldValue[propertyKey];
    if (propertyValue instanceof EdmTypeField && typeof value !== 'undefined') {
      complexTypeObject[propertyValue._fieldName] = tsToEdm(fieldValue[propertyKey], propertyValue.edmType);
    }
    return complexTypeObject;
  }, {});
}
