import { createLogger } from '@sap-cloud-sdk/util';
import {
  Constructable,
  EdmTypeField,
  OneToOneLink,
  Link,
  ComplexTypeField,
  CollectionField,
  Entity,
  ComplexTypeNamespace,
  isComplexTypeNameSpace,
  EdmTypeShared,
  isEdmType,
  PropertyMetadata,
  EnumField
} from '../odata-common';
import { toStaticPropertyFormat } from './name-converter';

const logger = createLogger({
  package: 'core',
  messageContext: 'entity-serializer'
});

/**
 * Interface representing the return type of the builder function [[entitySerializer]].
 */
export interface EntitySerializer<
  EntityT extends Entity = any,
  ComplexTypeNamespaceT extends ComplexTypeNamespace<any> = any
> {
  serializeEntity: (
    entity: EntityT,
    entityConstructor: Constructable<EntityT>,
    diff?: boolean
  ) => Record<string, any>;
  serializeComplexType: (
    fieldValue: any,
    complexTypeNameSpace: ComplexTypeNamespaceT
  ) => any;
  serializeEntityNonCustomFields: (
    entity: EntityT,
    entityConstructor: Constructable<EntityT>
  ) => Record<string, any>;
}

type TsToEdmType = (
  value: any,
  edmType: EdmTypeShared<'v2'> | EdmTypeShared<'v4'>
) => any;

/**
 * Constructs an entitySerializer given the OData v2 or v4 specific tsToEdm method.
 * The concrete serializers are created in odata/v2/entity-serializer.ts and odata/v4/entity-serializer.ts
 * @param tsToEdm - Converters ts input to edm values
 * @returns a entity serializer as defined by [[EntitySerializer]]
 */
export function entitySerializer(tsToEdm: TsToEdmType): EntitySerializer {
  /**
   * Converts an instance of an entity class into a JSON payload to be sent to an OData service.
   *
   * @param entity - An instance of an entity.
   * @param entityConstructor - The constructor function of that entity.
   * @param diff - Serialize changed properties only. This only applies on the first level in case there are navigational properties.
   * @returns JSON.
   */
  function serializeEntity<EntityT extends Entity>(
    entity: EntityT,
    entityConstructor: Constructable<EntityT>,
    diff = false
  ): Record<string, any> {
    return {
      ...serializeEntityNonCustomFields(entity, entityConstructor, diff),
      ...(diff ? entity.getUpdatedCustomFields() : entity.getCustomFields())
    };
  }

  function serializeField(field: any, fieldValue: any): any {
    if (fieldValue === null || fieldValue === undefined) {
      return null;
    }
    if (field instanceof EdmTypeField) {
      return tsToEdm(fieldValue, field.edmType);
    }
    if (field instanceof OneToOneLink) {
      return serializeEntity(fieldValue, field._linkedEntity);
    }
    if (field instanceof Link) {
      return fieldValue.map(linkedEntity =>
        serializeEntity(linkedEntity, field._linkedEntity)
      );
    }
    if (field instanceof ComplexTypeField) {
      if (field._complexType) {
        return serializeComplexType(fieldValue, field._complexType);
      }
      return serializeComplexTypeFieldLegacy(field, fieldValue);
    }
    if (field instanceof CollectionField) {
      return serializeCollection(fieldValue, field._fieldType);
    }
    if (field instanceof EnumField) {
      return fieldValue;
    }
  }

  /**
   * Converts an instance of an entity class into a JSON payload to be sent to an OData service, ignoring custom fields.
   *
   * @param entity - An instance of an entity.
   * @param entityConstructor - The constructor function of that entity.
   * @param diff - Serialize changed properties only. This only applies on the first level in case there are navigational properties.
   * @returns A JSON Representation of the non custom fields
   */
  function serializeEntityNonCustomFields<EntityT extends Entity>(
    entity: EntityT,
    entityConstructor: Constructable<EntityT>,
    diff = false
  ): Record<string, any> {
    return getFieldNames(entity, diff).reduce((serialized, key) => {
      const field = entityConstructor[toStaticPropertyFormat(key)];
      const fieldValue = entity[key];

      const serializedValue = serializeField(field, fieldValue);

      if (typeof serializedValue === 'undefined') {
        logger.warn(
          `Could not serialize value for unknown field: ${field}. Skipping field.`
        );
        return serialized;
      }

      return { ...serialized, [field._fieldName]: serializedValue };
    }, {});
  }

  function getFieldNames<EntityT extends Entity>(
    entity: EntityT,
    diff = false
  ): string[] {
    return entity
      ? diff
        ? entity.getUpdatedPropertyNames()
        : Object.keys(entity)
      : [];
  }

  // TODO: get rid of this function in v2.0
  function serializeComplexTypeFieldLegacy<EntityT extends Entity>(
    complexTypeField: ComplexTypeField<EntityT>,
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

  function serializeComplexTypeProperty(
    propertyValue: any,
    propertyMetadata: PropertyMetadata
  ): any {
    if (propertyMetadata.isCollection) {
      return serializeCollection(propertyValue, propertyMetadata.type);
    }

    if (isComplexTypeNameSpace(propertyMetadata.type)) {
      return serializeComplexType(propertyValue, propertyMetadata.type);
    }

    return tsToEdm(propertyValue, propertyMetadata.type);
  }

  function serializeComplexType<
    ComplexTypeNamespaceT extends ComplexTypeNamespace<any>
  >(fieldValue: any, complexType: ComplexTypeNamespaceT): any {
    return complexType._propertyMetadata
      .map(property => ({
        ...(typeof fieldValue[property.name] !== 'undefined' && {
          [property.originalName]: serializeComplexTypeProperty(
            fieldValue[property.name],
            property
          )
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

  function serializeCollection<
    FieldT extends EdmTypeShared<'any'> | Record<string, any>
  >(fieldValue: any[], fieldType: FieldT) {
    if (isEdmType(fieldType)) {
      return fieldValue.map(val => tsToEdm(val, fieldType));
    }
    if (isComplexTypeNameSpace(fieldType)) {
      return fieldValue.map(val => serializeComplexType(val, fieldType));
    }
    // Enum
    return fieldValue;
  }

  return {
    serializeEntity,
    serializeComplexType,
    serializeEntityNonCustomFields
  };
}
