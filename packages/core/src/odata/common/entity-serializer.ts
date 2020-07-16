/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType, createLogger } from '@sap-cloud-sdk/util';
import { toStaticPropertyFormat } from '../../util';
import {
  Constructable,
  EdmTypeField,
  OneToOneLink,
  Link,
  ComplexTypeField,
  CollectionField,
  EntityBase,
  ComplexTypeNamespace,
  isComplexTypeNameSpace
} from '../common';

const logger = createLogger({
  package: 'core',
  messageContext: 'entity-serializer'
});

// eslint-disable-next-line valid-jsdoc
/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function entitySerializer(tsToEdm) {
  /**
   * Converts an instance of an entity class into a JSON payload to be sent to an OData service.
   *
   * @param entity - An instance of an entity.
   * @param entityConstructor - The constructor function of that entity.
   * @returns JSON.
   */
  function serializeEntity<EntityT extends EntityBase>(
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
  function serializeEntityNonCustomFields<EntityT extends EntityBase>(
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
        if (field._complexType) {
          serialized[field._fieldName] = serializeComplexType(
            fieldValue,
            field._complexType
          );
        } else {
          serialized[field._fieldName] = serializeComplexTypeFieldLegacy(
            field,
            fieldValue
          );
        }
      } else if (field instanceof CollectionField) {
        serialized[field._fieldName] = serializeCollectionField(
          fieldValue,
          field
        );
      }

      return serialized;
    }, {});
  }

  // TODO: get rid of this function in v2.0
  function serializeComplexTypeFieldLegacy<
    EntityT extends EntityBase,
    ComplexTypeNamespaceT extends ComplexTypeNamespace
  >(
    complexTypeField: ComplexTypeField<EntityT, ComplexTypeNamespaceT>,
    fieldValue: any
  ): any {
    logger.warn(
      'It seems that you are using an outdated OData client. To make this warning disappear, please regenerate your client using the latest version of the SAP Cloud SDK generator.'
    );
    return Object.entries(complexTypeField)
      .filter(
        ([propertyKey, propertyValue]) =>
          (propertyValue instanceof EdmTypeField ||
            propertyValue instanceof ComplexTypeField) &&
          typeof fieldValue[propertyKey] !== 'undefined'
      )
      .reduce(
        (complexTypeObject, [propertyKey, propertyValue]) => ({
          ...complexTypeObject,
          [propertyValue._fieldName]:
            propertyValue instanceof EdmTypeField
              ? tsToEdm(fieldValue[propertyKey], propertyValue.edmType)
              : serializeComplexTypeFieldLegacy(
                  propertyValue,
                  fieldValue[propertyKey]
                )
        }),
        {}
      );
  }

  function serializeComplexType<
    ComplexTypeNamespaceT extends ComplexTypeNamespace
  >(fieldValue: any, complexType: ComplexTypeNamespaceT): any {
    return complexType._propertyMetadata
      .map(property => ({
        ...(typeof fieldValue[property.name] !== 'undefined' && {
          [property.originalName]: isComplexTypeNameSpace(property.type)
            ? serializeComplexType(fieldValue[property.name], property.type)
            : tsToEdm(fieldValue[property.name], property.type)
        })
      }))
      .reduce(
        (complexTypeObject, property) => ({
          ...complexTypeObject,
          ...property
        }),
        {}
      );
  }

  function serializeCollectionField<EntityT extends EntityBase>(
    fieldValue: any[],
    selectable: CollectionField<EntityT>
  ) {
    if (selectable._fieldType instanceof EdmTypeField) {
      const edmType = selectable._fieldType.edmType;
      return fieldValue.map(v => tsToEdm(v, edmType));
    }
    if (selectable._fieldType instanceof ComplexTypeField) {
      const complexTypeField = selectable._fieldType;
      return fieldValue.map(v =>
        serializeComplexTypeFieldLegacy(complexTypeField, v)
      );
    }
  }

  return {
    serializeEntity,
    serializeEntityNonCustomFields
  };
}
