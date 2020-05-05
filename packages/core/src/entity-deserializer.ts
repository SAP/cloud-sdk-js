/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable, ConstructableODataV4 } from './constructable';
import {
  Entity,
  EntityODataV4,
  isExpandedProperty,
  isExpandedPropertyODataV4,
  isSelectedProperty,
  isSelectedPropertyODataV4
} from './entity';
import { edmToTs } from './payload-value-converter';
import {
  CollectionFieldODataV4,
  ComplexTypeField, ComplexTypeFieldODataV4,
  EdmTypeField, EdmTypeFieldODataV4,
  Link, LinkODataV4,
  OneToOneLink, OneToOneLinkODataV4,
  Selectable, SelectableODataV4
} from './selectable';
import { toPropertyFormat } from './util';

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
): MapType<any> {
  const regularODataProperties = [
    '__metadata',
    '__deferred',
    ...entityConstructor._allFields.map(field => field._fieldName)
  ];
  const regularFields = new Set<string>(regularODataProperties);
  return Object.keys(json)
    .filter(key => !regularFields.has(key))
    .reduce((customFields, key) => {
      customFields[key] = json[key];
      return customFields;
    }, {});
}

export function extractCustomFieldsODataV4<EntityT extends EntityODataV4, JsonT>(
  json: Partial<JsonT>,
  entityConstructor: ConstructableODataV4<EntityT>
): MapType<any> {
  const regularODataProperties = [
    '__metadata',
    '__deferred',
    ...entityConstructor._allFields.map(field => field._fieldName)
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
export function deserializeEntity<EntityT extends Entity, JsonT>(
  json: Partial<JsonT>,
  entityConstructor: Constructable<EntityT>,
  requestHeader?: any
): EntityT {
  const etag = extractODataETag(json) || extractEtagFromHeader(requestHeader);
  return entityConstructor._allFields
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

export function deserializeEntityODataV4<EntityT extends EntityODataV4, JsonT>(
  json: Partial<JsonT>,
  entityConstructor: ConstructableODataV4<EntityT>,
  requestHeader?: any
): EntityT {
  const etag = extractODataETag(json) || extractEtagFromHeader(requestHeader);
  const a = entityConstructor._allFields
    .filter(field => isSelectedPropertyODataV4(json, field));
  return entityConstructor._allFields
    .filter(field => isSelectedPropertyODataV4(json, field))
    .reduce((entity, staticField) => {
      entity[toPropertyFormat(staticField._fieldName)] = getFieldValueODataV4(
        json,
        staticField
      );
      return entity;
    }, new entityConstructor())
    .initializeCustomFields(extractCustomFieldsODataV4(json, entityConstructor))
    .setVersionIdentifier(etag)
    .setOrInitializeRemoteState();
}

function extractEtagFromHeader(headers: any): string | undefined {
  return headers ? headers['Etag'] || headers['etag'] : undefined;
}

function extractODataETag(json: MapType<any>): string | undefined {
  return '__metadata' in json ? json['__metadata']['etag'] : undefined;
}

function getFieldValue<EntityT extends Entity, JsonT>(
  json: Partial<JsonT>,
  selectable: Selectable<EntityT>
) {
  if (selectable instanceof EdmTypeField) {
    return edmToTs(json[selectable._fieldName], selectable.edmType);
  } else if (selectable instanceof Link) {
    return getLinkFromJson(json, selectable);
  } else if (selectable instanceof ComplexTypeField) {
    return deserializeComplexType(json[selectable._fieldName], selectable);
  }
}

function getFieldValueODataV4<EntityT extends EntityODataV4, JsonT>(
  json: Partial<JsonT>,
  selectable: SelectableODataV4<EntityT>
) {
  if (selectable instanceof EdmTypeFieldODataV4) {
    const ret = edmToTs(json[selectable._fieldName], selectable.edmType);
    return edmToTs(json[selectable._fieldName], selectable.edmType);
  } else if (selectable instanceof LinkODataV4) {
    return getLinkFromJsonODataV4(json, selectable);
  } else if (selectable instanceof ComplexTypeFieldODataV4) {
    const ret = deserializeComplexTypeODataV4(json[selectable._fieldName], selectable);
    return deserializeComplexTypeODataV4(json[selectable._fieldName], selectable);
  } else if (selectable instanceof CollectionFieldODataV4) {
    const ret = deserializeCollectionTypeODataV4(json[selectable._fieldName], selectable);
    return deserializeCollectionTypeODataV4(json[selectable._fieldName], selectable);
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

function getLinkFromJsonODataV4<
  EntityT extends EntityODataV4,
  LinkedEntityT extends EntityODataV4,
  JsonT
  >(json: Partial<JsonT>, link: LinkODataV4<EntityT, LinkedEntityT>) {
  return link instanceof OneToOneLinkODataV4
    ? getSingleLinkFromJsonODataV4(json, link)
    : getMultiLinkFromJsonODataV4(json, link);
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
    const entity = deserializeEntity(json[link._fieldName], link._linkedEntity);
    return entity;
  }
  return null;
}

function getSingleLinkFromJsonODataV4<
  EntityT extends EntityODataV4,
  LinkedEntityT extends EntityODataV4,
  JsonT
  >(
  json: Partial<JsonT>,
  link: LinkODataV4<EntityT, LinkedEntityT>
): LinkedEntityT | null {
  if (isExpandedPropertyODataV4(json, link)) {
    const entity = deserializeEntityODataV4(json[link._fieldName], link._linkedEntity);
    return entity;
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
    const results = json[link._fieldName].results || [];
    return results.map(linkJson =>
      deserializeEntity(linkJson, link._linkedEntity)
    );
  }
}

function getMultiLinkFromJsonODataV4<
  EntityT extends EntityODataV4,
  LinkedEntityT extends EntityODataV4,
  JsonT
  >(
  json: Partial<JsonT>,
  link: LinkODataV4<EntityT, LinkedEntityT>
): LinkedEntityT[] | undefined {
  if (isSelectedPropertyODataV4(json, link)) {
    const results = json[link._fieldName].results || [];
    return results.map(linkJson =>
      deserializeEntityODataV4(linkJson, link._linkedEntity)
    );
  }
}

function deserializeComplexType<EntityT extends Entity>(
  json: MapType<any>,
  selectable: ComplexTypeField<EntityT>
): MapType<any> {
  return Object.entries(selectable)
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

function deserializeComplexTypeODataV4<EntityT extends EntityODataV4>(
  json: MapType<any>,
  selectable: ComplexTypeFieldODataV4<EntityT>
): MapType<any> {
  return Object.entries(selectable)
    .filter(
      ([_, field]) =>
        field instanceof EdmTypeFieldODataV4 &&
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

function deserializeCollectionTypeODataV4<EntityT extends EntityODataV4>(
  json: any[],
  selectable: CollectionFieldODataV4<EntityT>
) {
  if (selectable._elementType instanceof EdmTypeFieldODataV4) {
    const edmType = selectable._elementType.edmType;
    return json.map(v => edmToTs(v, edmType));
  } else if (selectable._elementType instanceof ComplexTypeFieldODataV4) {
    const complexTypeField = selectable._elementType;
    return json.map(v => deserializeComplexTypeODataV4(v, complexTypeField));
  }
}
