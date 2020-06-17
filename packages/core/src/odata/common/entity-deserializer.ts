/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { toPropertyFormat } from '../../util';
import {
  Constructable,
  isSelectedProperty,
  Field,
  Link,
  EdmTypeField,
  ComplexTypeField,
  CollectionField,
  OneToOneLink,
  isExpandedProperty,
  EntityBase
} from '../common';

// eslint-disable-next-line valid-jsdoc
/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function entityDeserializer(edmToTs) {
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

  function extractODataETag(json: MapType<any>): string | undefined {
    return '__metadata' in json ? json['__metadata']['etag'] : undefined;
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
      return json[field._fieldName]
        ? deserializeComplexType(json[field._fieldName], field)
        : undefined;
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
      const results = json[link._fieldName].results || [];
      return results.map(linkJson =>
        deserializeEntity(linkJson, link._linkedEntity)
      );
    }
  }

  function deserializeComplexType<EntityT extends EntityBase>(
    json: MapType<any>,
    complexTypeField: ComplexTypeField<EntityT>
  ): MapType<any> {
    return Object.entries(complexTypeField)
      .filter(
        ([_, field]) =>
          field instanceof EdmTypeField &&
          typeof json[field._fieldName] !== 'undefined'
      )
      .reduce((complexTypeObject, [fieldName, field]) => {
        complexTypeObject[toPropertyFormat(fieldName)] = edmToTs(
          json[field._fieldName],
          field.edmType
        );
        return complexTypeObject;
      }, {});
  }

  function deserializeCollectionType<EntityT extends EntityBase>(
    json: any[],
    selectable: CollectionField<EntityT>
  ) {
    if (selectable._fieldType instanceof EdmTypeField) {
      const edmType = selectable._fieldType.edmType;
      return json.map(v => edmToTs(v, edmType));
    }
    if (selectable._fieldType instanceof ComplexTypeField) {
      const complexTypeField = selectable._fieldType;
      return json.map(v => deserializeComplexType(v, complexTypeField));
    }
  }

  // TODO: extractCustomFields should not be exported here. This was probably done only for testing
  return {
    extractCustomFields,
    deserializeEntity
  };
}
