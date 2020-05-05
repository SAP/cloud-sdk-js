/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable, ConstructableODataV4 } from './constructable';
import { Entity, EntityODataV4 } from './entity';
import { tsToEdm } from './payload-value-converter';
import {
  CollectionFieldODataV4,
  ComplexTypeField, ComplexTypeFieldODataV4,
  EdmTypeField, EdmTypeFieldODataV4,
  Link, LinkODataV4,
  OneToOneLink, OneToOneLinkODataV4
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

export function serializeEntityODataV4<EntityT extends EntityODataV4>(
  entity: EntityT,
  entityConstructor: ConstructableODataV4<EntityT>
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

    if (fieldValue === null || fieldValue === undefined) {
      serialized[selectable._fieldName] = null;
    } else if (selectable instanceof EdmTypeField) {
      serialized[selectable._fieldName] = tsToEdm(
        fieldValue,
        selectable.edmType
      );
    } else if (selectable instanceof OneToOneLink) {
      serialized[selectable._fieldName] = serializeEntityNonCustomFields(
        fieldValue,
        selectable._linkedEntity
      );
    } else if (selectable instanceof Link) {
      serialized[selectable._fieldName] = fieldValue.map(linkedEntity =>
        serializeEntityNonCustomFields(linkedEntity, selectable._linkedEntity)
      );
    } else if (selectable instanceof ComplexTypeField) {
      serialized[selectable._fieldName] = serializeComplexTypeField(
        selectable,
        fieldValue
      );
    }

    return serialized;
  }, {});
}

export function serializeEntityNonCustomFieldsODataV4<EntityT extends EntityODataV4>(
  entity: EntityT,
  entityConstructor: ConstructableODataV4<EntityT>
): MapType<any> {
  if (!entity) {
    return {};
  }
  return Object.keys(entity).reduce((serialized, key) => {
    const selectable = entityConstructor[toStaticPropertyFormat(key)];
    const fieldValue = entity[key];

    if (fieldValue === null || fieldValue === undefined) {
      serialized[selectable._fieldName] = null;
    } else if (selectable instanceof EdmTypeFieldODataV4) {
      serialized[selectable._fieldName] = tsToEdm(
        fieldValue,
        selectable.edmType
      );
    } else if (selectable instanceof OneToOneLinkODataV4) {
      serialized[selectable._fieldName] = serializeEntityNonCustomFieldsODataV4(
        fieldValue,
        selectable._linkedEntity
      );
    } else if (selectable instanceof LinkODataV4) {
      serialized[selectable._fieldName] = fieldValue.map(linkedEntity =>
        serializeEntityNonCustomFieldsODataV4(linkedEntity, selectable._linkedEntity)
      );
    } else if (selectable instanceof ComplexTypeFieldODataV4) {
      serialized[selectable._fieldName] = serializeComplexTypeFieldODataV4(
        selectable,
        fieldValue
      );
    } else if (selectable instanceof CollectionFieldODataV4) {
      serialized[selectable._fieldName] = serilizeCollectionFieldODataV4(
        fieldValue,
        selectable
      );
    }

    return serialized;
  }, {});
}

function serilizeCollectionFieldODataV4<EntityT extends EntityODataV4>(
  fieldValue: any[],
  selectable: CollectionFieldODataV4<EntityT>
) {
  if (selectable._elementType instanceof EdmTypeFieldODataV4) {
    const edmType = selectable._elementType.edmType;
    return fieldValue.map(v => tsToEdm(v, edmType));
  } else if (selectable._elementType instanceof ComplexTypeFieldODataV4) {
    const complexTypeField = selectable._elementType;
    return fieldValue.map(v => serializeComplexTypeFieldODataV4(complexTypeField, v));
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

function serializeComplexTypeFieldODataV4<EntityT extends EntityODataV4>(
  selectable: ComplexTypeFieldODataV4<EntityT>,
  fieldValue: any
): any {
  return Object.entries(selectable).reduce(
    (complexTypeObject, [propertyKey, propertyValue]) => {
      const value = fieldValue[propertyKey];
      if (
        propertyValue instanceof EdmTypeFieldODataV4 &&
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
