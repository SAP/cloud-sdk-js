import {
  camelCase,
  createLogger,
  pickValueIgnoreCase
} from '@sap-cloud-sdk/util';
import { createValueDeserializer, DeSerializers } from './de-serializers';
import {
  EntityBase,
  isExpandedProperty,
  isSelectedProperty
} from './entity-base';
import { EdmTypeShared, isEdmType } from './edm-types';
import {
  ComplexTypeNamespace,
  isComplexTypeNameSpace,
  PropertyMetadata,
  Field,
  Link,
  EdmTypeField,
  EnumField,
  CollectionField,
  ComplexTypeField,
  OneToOneLink
} from './selectable';
import { EntityApi, EntityType } from './entity-api';

const logger = createLogger({
  package: 'odata-common',
  messageContext: 'entity-deserializer'
});

/**
 * Interface representing the return type of the builder function {@link entityDeserializer}.
 */
export interface EntityDeserializer {
  /**
   * Method to deserialize the full entity from JSON to an entity object.
   */
  deserializeEntity: <EntityT extends EntityBase = EntityBase>(
    json: any,
    entityApi: EntityApi<EntityT, any>,
    requestHeader?: any
  ) => EntityT;

  /**
   * Method to deserialize the full entity from JSON to the complex type property.
   */
  deserializeComplexType: (
    json: Record<string, any>,
    complexType: ComplexTypeNamespace<any>
  ) => any;
}

/**
 * Constructs an entityDeserializer given the OData v2 or v4 specific methods.
 * The concrete deserializers are created in odata/v2/entity-deserializer.ts and odata/v4/entity-deserializer.ts.
 * @param deSerializers - (De-)serializers used for transformation.
 * @param extractODataETag - Extractor for the ETag.
 * @param extractDataFromOneToManyLink - Extractor for data related to one to many links.
 * @returns An entity deserializer as defined by {@link EntityDeserializer}.
 */
export function entityDeserializer<T extends DeSerializers>(
  deSerializers: T,
  extractODataETag: (json: Record<string, any>) => string | undefined,
  extractDataFromOneToManyLink: (data: any) => any[]
): EntityDeserializer {
  const edmToTs = createValueDeserializer(deSerializers);
  /**
   * Converts the JSON payload for a single entity into an instance of the corresponding generated entity class.
   * It sets the remote state to the data provided by the JSON payload.
   * If a version identifier is found in the '__metadata' or in the request header, the method also sets it.
   * @param json - The JSON payload.
   * @param entityApi - Entity API to deserialize for.
   * @param requestHeader - Optional parameter which may be used to add a version identifier (ETag) to the entity.
   * @returns An instance of the entity class.
   */
  function deserializeEntity<
    EntityApiT extends EntityApi<EntityBase, any>,
    JsonT
  >(
    json: Partial<JsonT>,
    entityApi: EntityApiT,
    requestHeader?: any
  ): EntityType<EntityApiT> {
    const etag = extractODataETag(json) || extractEtagFromHeader(requestHeader);
    return Object.values(entityApi.schema)
      .filter(field => isSelectedProperty(json, field))
      .reduce((entity, staticField) => {
        entity[camelCase(staticField._fieldName)] = getFieldValue(
          json,
          staticField
        );
        return entity;
      }, new entityApi.entityConstructor(entityApi))
      .setCustomFields(extractCustomFields(json, entityApi.schema))
      .setVersionIdentifier(etag)
      .setOrInitializeRemoteState();
  }

  function getFieldValue<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers,
    JsonT
  >(
    json: Partial<JsonT>,
    field:
      | Field<EntityT>
      | Link<EntityT, DeSerializersT, EntityApi<EntityBase, DeSerializersT>>
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
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers,
    LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>,
    JsonT
  >(
    json: Partial<JsonT>,
    link: Link<EntityT, DeSerializersT, LinkedEntityApiT>
  ) {
    return link instanceof OneToOneLink
      ? getSingleLinkFromJson(json, link)
      : getMultiLinkFromJson(json, link);
  }

  // Be careful: if the return type is changed to `LinkedEntityT | undefined`, the test 'navigation properties should never be undefined' of the 'business-partner.spec.ts' will fail.
  // Not sure the purpose of the usage of null.
  function getSingleLinkFromJson<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers,
    LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>,
    JsonT
  >(
    json: Partial<JsonT>,
    link: Link<EntityT, DeSerializersT, LinkedEntityApiT>
  ): EntityType<LinkedEntityApiT> | null {
    if (isExpandedProperty(json, link)) {
      return deserializeEntity(json[link._fieldName], link._linkedEntityApi);
    }
    return null;
  }

  function getMultiLinkFromJson<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers,
    LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>,
    JsonT
  >(
    json: Partial<JsonT>,
    link: Link<EntityT, DeSerializersT, LinkedEntityApiT>
  ): EntityType<LinkedEntityApiT>[] | undefined {
    if (isSelectedProperty(json, link)) {
      const results = extractDataFromOneToManyLink(json[link._fieldName]);
      return results.map(linkJson =>
        deserializeEntity(linkJson, link._linkedEntityApi)
      );
    }
  }

  // TODO: get rid of this function in v2.0
  function deserializeComplexTypeLegacy<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers
  >(
    json: Record<string, any>,
    complexTypeField: ComplexTypeField<EntityT, DeSerializersT>
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
          [camelCase(fieldName)]:
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

/**
 * Extract eTag from custom header ignoring case.
 * @param headers - Headers from which the etag is extracted.
 * @returns string | undefined
 * @internal
 */
export function extractEtagFromHeader(headers: any): string | undefined {
  return pickValueIgnoreCase(headers, 'etag');
}

/**
 * Extracts all custom fields from the JSON payload for a single entity.
 * In this context, a custom fields is every property that is not known in the corresponding entity class.
 * @param json - The JSON payload.
 * @param schema - TODO
 * @returns An object containing the custom fields as key-value pairs.
 * @internal
 */
export function extractCustomFields<JsonT>(
  json: Partial<JsonT>,
  schema: Record<string, any>
): Record<string, any> {
  const regularODataProperties = [
    '__metadata',
    '__deferred',
    // type assertion for backwards compatibility, TODO: remove in v2.0
    ...Object.values(schema).map(field => field._fieldName)
  ];
  const regularFields = new Set<string>(regularODataProperties);
  return Object.keys(json)
    .filter(key => !regularFields.has(key))
    .reduce((customFields, key) => {
      customFields[key] = json[key];
      return customFields;
    }, {});
}
