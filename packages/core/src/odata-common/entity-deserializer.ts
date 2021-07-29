import { createLogger } from '@sap-cloud-sdk/util';
import {
  isSelectedProperty,
  Field,
  Link,
  EdmTypeField,
  ComplexTypeField,
  CollectionField,
  OneToOneLink,
  isExpandedProperty,
  Entity,
  Constructable,
  ComplexTypeNamespace,
  isComplexTypeNameSpace,
  EdmTypeShared,
  isEdmType,
  PropertyMetadata,
  EnumField
} from '../odata-common';
import {
  EdmToPrimitive as EdmToPrimitiveV2,
  EdmType as EdmTypeV2
} from '../odata-v2';
import {
  EdmToPrimitive as EdmToPrimitiveV4,
  EdmType as EdmTypeV4
} from '../odata-v4';
import { toPropertyFormat } from './name-converter';

const logger = createLogger({
  package: 'core',
  messageContext: 'entity-deserializer'
});

/**
 * Interface representing the return type of the builder function [[entityDeserializer]]
 */
export interface EntityDeserializer<EntityT extends Entity = any> {
  deserializeEntity: (
    json: any,
    entityConstructor: Constructable<EntityT>,
    requestHeader?: any
  ) => EntityT;
  deserializeComplexType: (
    json: Record<string, any>,
    complexType: ComplexTypeNamespace<any>
  ) => any;
}

type EdmToTsTypeV2<EdmT extends EdmTypeV2 = any> = (
  value: any,
  edmType: EdmTypeShared<'v2'>
) => EdmToPrimitiveV2<EdmT>;
type EdmToTsTypeV4<EdmT extends EdmTypeV4 = any> = (
  value: any,
  edmType: EdmTypeShared<'v4'>
) => EdmToPrimitiveV4<EdmT>;
type ExtractODataETagType = (json: Record<string, any>) => string | undefined;
type ExtractDataFromOneToManyLinkType = (data: any) => any[];

/**
 * Constructs an entityDeserializer given the OData v2 or v4 specific methods.
 * The concrete deserializers are created in odata/v2/entity-deserializer.ts and odata/v4/entity-deserializer.ts
 * @param edmToTs - Converters  emd input to ts values.
 * @param extractODataETag - Extractor for the Etag.
 * @param extractDataFromOneToManyLink - Extractor for data related to one to many links.
 * @returns a entity deserializer as defined by [[EntityDeserializer]]
 */
export function entityDeserializer(
  edmToTs: EdmToTsTypeV2 | EdmToTsTypeV4,
  extractODataETag: ExtractODataETagType,
  extractDataFromOneToManyLink: ExtractDataFromOneToManyLinkType
): EntityDeserializer {
  /**
   * Converts the JSON payload for a single entity into an instance of the corresponding generated entity class.
   * It sets the remote state to the data provided by the JSON payload.
   * If a version identifier is found in the '__metadata' or in the request header, the method also sets it.
   *
   * @param json - The JSON payload.
   * @param entityConstructor - The constructor function of the entity class.
   * @param requestHeader - Optional parameter which may be used to add a version identifier (etag) to the entity
   * @returns An instance of the entity class.
   */
  function deserializeEntity<EntityT extends Entity, JsonT>(
    json: Partial<JsonT>,
    entityConstructor: Constructable<EntityT>,
    requestHeader?: any
  ): EntityT {
    const etag = extractODataETag(json) || extractEtagFromHeader(requestHeader);
    return (entityConstructor._allFields as (Field<EntityT> | Link<EntityT>)[]) // type assertion for backwards compatibility, TODO: remove in v2.0
      .filter(field => isSelectedProperty(json, field))
      .reduce((entity, staticField) => {
        entity[toPropertyFormat(staticField._fieldName)] = getFieldValue(
          json,
          staticField
        );
        return entity;
      }, new entityConstructor())
      .initializeCustomFields(extractCustomFields(json, entityConstructor))
      .setVersionIdentifier(etag)
      .setOrInitializeRemoteState();
  }

  function getFieldValue<EntityT extends Entity, JsonT>(
    json: Partial<JsonT>,
    field: Field<EntityT> | Link<EntityT>
  ) {
    if (field instanceof EdmTypeField) {
      return edmToTs(json[field._fieldName], field.edmType);
    }
    if (field instanceof Link) {
      return getLinkFromJson(json, field);
    }
    if (field instanceof ComplexTypeField) {
      if (json[field._fieldName]) {
        return field._complexType
          ? deserializeComplexType(json[field._fieldName], field._complexType)
          : deserializeComplexTypeLegacy(json[field._fieldName], field);
      }
      return json[field._fieldName];
    }
    if (field instanceof CollectionField) {
      return deserializeCollectionType(
        json[field._fieldName],
        field._fieldType
      );
    }
    if (field instanceof EnumField) {
      return json[field._fieldName];
    }
  }

  function getLinkFromJson<
    EntityT extends Entity,
    LinkedEntityT extends Entity,
    JsonT
  >(json: Partial<JsonT>, link: Link<EntityT, LinkedEntityT>) {
    return link instanceof OneToOneLink
      ? getSingleLinkFromJson(json, link)
      : getMultiLinkFromJson(json, link);
  }

  // Be careful: if the return type is changed to `LinkedEntityT | undefined`, the test 'navigation properties should never be undefined' of the 'business-partner.spec.ts' will fail.
  // Not sure the purpose of the usage of null.
  function getSingleLinkFromJson<
    EntityT extends Entity,
    LinkedEntityT extends Entity,
    JsonT
  >(
    json: Partial<JsonT>,
    link: Link<EntityT, LinkedEntityT>
  ): LinkedEntityT | null {
    if (isExpandedProperty(json, link)) {
      return deserializeEntity(json[link._fieldName], link._linkedEntity);
    }
    return null;
  }

  function getMultiLinkFromJson<
    EntityT extends Entity,
    LinkedEntityT extends Entity,
    JsonT
  >(
    json: Partial<JsonT>,
    link: Link<EntityT, LinkedEntityT>
  ): LinkedEntityT[] | undefined {
    if (isSelectedProperty(json, link)) {
      const results = extractDataFromOneToManyLink(json[link._fieldName]);
      return results.map(linkJson =>
        deserializeEntity(linkJson, link._linkedEntity)
      );
    }
  }

  // TODO: get rid of this function in v2.0
  function deserializeComplexTypeLegacy<EntityT extends Entity>(
    json: Record<string, any>,
    complexTypeField: ComplexTypeField<EntityT>
  ): Record<string, any> | null {
    logger.warn(
      'It seems that you are using an outdated OData client. To make this warning disappear, please regenerate your client using the latest version of the SAP Cloud SDK generator.'
    );
    if (json === null) {
      return null;
    }
    return Object.entries(complexTypeField)
      .filter(
        ([, field]) =>
          (field instanceof EdmTypeField ||
            field instanceof ComplexTypeField) &&
          typeof json[field._fieldName] !== 'undefined'
      )
      .reduce(
        (complexTypeObject, [fieldName, field]) => ({
          ...complexTypeObject,
          [toPropertyFormat(fieldName)]:
            field instanceof EdmTypeField
              ? edmToTs(json[field._fieldName], field.edmType)
              : deserializeComplexTypeLegacy(json[field._fieldName], field)
        }),
        {}
      );
  }

  function deserializeComplexTypeProperty(
    propertyValue: any,
    propertyMetadata: PropertyMetadata
  ) {
    if (propertyMetadata.isCollection) {
      return deserializeCollectionType(propertyValue, propertyMetadata.type);
    }

    if (isComplexTypeNameSpace(propertyMetadata.type)) {
      return deserializeComplexType(propertyValue, propertyMetadata.type);
    }

    return edmToTs(propertyValue, propertyMetadata.type);
  }

  function deserializeComplexType(
    json: Record<string, any>,
    complexType: ComplexTypeNamespace<any>
  ): any {
    if (json === null) {
      return null;
    }

    return complexType._propertyMetadata
      .map(property => ({
        ...(typeof json[property.originalName] !== 'undefined' && {
          [property.name]: deserializeComplexTypeProperty(
            json[property.originalName],
            property
          )
        })
      }))
      .reduce((complexTypeInstance, property) => ({
        ...complexTypeInstance,
        ...property
      }));
  }

  function deserializeCollectionType<
    FieldT extends EdmTypeShared<'any'> | Record<string, any>
  >(json: any[], fieldType: FieldT) {
    if (isEdmType(fieldType)) {
      return json.map(val => edmToTs(val, fieldType));
    }
    if (isComplexTypeNameSpace(fieldType)) {
      return json.map(val => deserializeComplexType(val, fieldType));
    }
    // Enum
    return json;
  }

  return {
    deserializeEntity,
    deserializeComplexType
  };
}

export function extractEtagFromHeader(headers: any): string | undefined {
  return headers ? headers['Etag'] || headers['etag'] : undefined;
}

/**
 * Extracts all custom fields from the JSON payload for a single entity.
 * In this context, a custom fields is every property that is not known in the corresponding entity class.
 *
 * @param json - The JSON payload.
 * @param entityConstructor - The constructor function of the entity class.
 * @returns An object containing the custom fields as key-value pairs.
 */
export function extractCustomFields<EntityT extends Entity, JsonT>(
  json: Partial<JsonT>,
  entityConstructor: Constructable<EntityT>
): Record<string, any> {
  const regularODataProperties = [
    '__metadata',
    '__deferred',
    // type assertion for backwards compatibility, TODO: remove in v2.0
    ...(entityConstructor._allFields as (Field<EntityT> | Link<EntityT>)[]).map(
      field => field._fieldName
    )
  ];
  const regularFields = new Set<string>(regularODataProperties);
  return Object.keys(json)
    .filter(key => !regularFields.has(key))
    .reduce((customFields, key) => {
      customFields[key] = json[key];
      return customFields;
    }, {});
}
