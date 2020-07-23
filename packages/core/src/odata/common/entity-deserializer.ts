/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType, createLogger } from '@sap-cloud-sdk/util';
import { toPropertyFormat } from '../../util';
import {
  isSelectedProperty,
  Field,
  Link,
  EdmTypeField,
  ComplexTypeField,
  CollectionField,
  OneToOneLink,
  isExpandedProperty,
  EntityBase,
  Constructable,
  ComplexTypeNamespace,
  isComplexTypeNameSpace,
  EdmTypeShared,
  isEdmType
} from '../common';

const logger = createLogger({
  package: 'core',
  messageContext: 'entity-deserializer'
});

// eslint-disable-next-line valid-jsdoc
/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function entityDeserializer(
  edmToTs,
  extractODataETag,
  extractDataFromOneToManyLink: (arg) => any[] | undefined
) {
  /**
   * Extracts all custom fields from the JSON payload for a single entity.
   * In this context, a custom fields is every property that is not known in the corresponding entity class.
   *
   * @param json - The JSON payload.
   * @param entityConstructor - The constructor function of the entity class.
   * @returns An object containing the custom fields as key-value pairs.
   */
  function extractCustomFields<EntityT extends EntityBase, JsonT>(
    json: Partial<JsonT>,
    entityConstructor: Constructable<EntityT>
  ): MapType<any> {
    const regularODataProperties = [
      '__metadata',
      '__deferred',
      // type assertion for backwards compatibility, TODO: remove in v2.0
      ...(entityConstructor._allFields as (
        | Field<EntityT>
        | Link<EntityT>
      )[]).map(field => field._fieldName)
    ];
    const regularFields = new Set<string>(regularODataProperties);
    return Object.keys(json)
      .filter(key => !regularFields.has(key))
      .reduce((customFields, key) => {
        customFields[key] = json[key];
        return customFields;
      }, {});
  }

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
  function deserializeEntity<EntityT extends EntityBase, JsonT>(
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

  function extractEtagFromHeader(headers: any): string | undefined {
    return headers ? headers['Etag'] || headers['etag'] : undefined;
  }

  function getFieldValue<EntityT extends EntityBase, JsonT>(
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
      return undefined;
    }
    if (field instanceof CollectionField) {
      return deserializeCollectionType(json[field._fieldName], field);
    }
  }

  function getLinkFromJson<
    EntityT extends EntityBase,
    LinkedEntityT extends EntityBase,
    JsonT
  >(json: Partial<JsonT>, link: Link<EntityT, LinkedEntityT>) {
    return link instanceof OneToOneLink
      ? getSingleLinkFromJson(json, link)
      : getMultiLinkFromJson(json, link);
  }

  // Be careful: if the return type is changed to `LinkedEntityT | undefined`, the test 'navigation properties should never be undefined' of the 'business-partner.spec.ts' will fail.
  // Not sure the purpose of the usage of null.
  function getSingleLinkFromJson<
    EntityT extends EntityBase,
    LinkedEntityT extends EntityBase,
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
    EntityT extends EntityBase,
    LinkedEntityT extends EntityBase,
    JsonT
  >(
    json: Partial<JsonT>,
    link: Link<EntityT, LinkedEntityT>
  ): LinkedEntityT[] | undefined {
    if (isSelectedProperty(json, link)) {
      const results = extractDataFromOneToManyLink(json[link._fieldName]) || [];
      return results.map(linkJson =>
        deserializeEntity(linkJson, link._linkedEntity)
      );
    }
  }

  // TODO: get rid of this function in v2.0
  function deserializeComplexTypeLegacy<EntityT extends EntityBase>(
    json: MapType<any>,
    complexTypeField: ComplexTypeField<EntityT>
  ): MapType<any> {
    logger.warn(
      'It seems that you are using an outdated OData client. To make this warning disappear, please regenerate your client using the latest version of the SAP Cloud SDK generator.'
    );
    return Object.entries(complexTypeField)
      .filter(
        ([_, field]) =>
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

  function deserializeComplexType<
    ComplexTypeNamespaceT extends ComplexTypeNamespace<any>
  >(json: MapType<any>, complexType: ComplexTypeNamespaceT): any {
    return complexType._propertyMetadata
      .map(property => ({
        ...(typeof json[property.originalName] !== 'undefined' && {
          [property.name]: isComplexTypeNameSpace(property.type)
            ? deserializeComplexType(json[property.originalName], property.type)
            : edmToTs(json[property.originalName], property.type)
        })
      }))
      .reduce((complexTypeInstance, property) => ({
        ...complexTypeInstance,
        ...property
      }));
  }

  function deserializeCollectionType<
    EntityT extends EntityBase,
    FieldT extends EdmTypeShared<'any'> | Record<string, any>
  >(json: any[], field: CollectionField<EntityT, FieldT>) {
    const fieldType = field._fieldType;
    if (isEdmType(fieldType)) {
      return json.map(val => edmToTs(val, fieldType));
    }
    if (isComplexTypeNameSpace(fieldType)) {
      return json.map(val => deserializeComplexType(val, fieldType));
    }
  }

  // TODO: extractCustomFields should not be exported here. This was probably done only for testing
  return {
    extractCustomFields,
    deserializeEntity,
    deserializeComplexType
  };
}
