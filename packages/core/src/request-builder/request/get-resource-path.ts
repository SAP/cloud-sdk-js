/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { createLogger, MapType } from '@sap-cloud-sdk/util';
import { FieldType } from '../..';
import { Constructable } from '../../constructable';
import { Entity } from '../../entity';
import { convertToUriFormat } from '../../uri-value-converter';
import { toStaticPropertyFormat } from '../../util';

const logger = createLogger({
  package: 'core',
  messageContext: 'get-resource-path'
});

/**
 * Get the resource path of an entity specified by key-value pairs.
 *
 * @typeparam EntityT - Type of the entity to get the resource path for
 * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value
 * @param entityConstructor - Constructor type of the entity to get the resource path for
 * @returns The path to the resource
 */
export function getResourcePathForKeys<EntityT extends Entity>(keys: MapType<FieldType> = {}, entityConstructor: Constructable<EntityT>): string {
  keys = filterNonKeyProperties(keys, entityConstructor);
  validateKeys(keys, entityConstructor);

  if (Object.keys(keys).length) {
    const byKey = Object.entries(keys)
      .map(([key, value]) => keyToOData(key, value, entityConstructor))
      .join(',');
    return `${entityConstructor._entityName}(${byKey})`;
  }

  return entityConstructor._entityName;
}

function getMissingKeys<EntityT extends Entity>(keys: MapType<FieldType>, entityConstructor: Constructable<EntityT>): string[] {
  const givenKeys = Object.keys(keys);
  return entityConstructor._keyFields.map(field => field._fieldName).filter(fieldName => !givenKeys.includes(fieldName));
}

function getInvalidKeys<EntityT extends Entity>(keys: MapType<FieldType>, entityConstructor: Constructable<EntityT>): string[] {
  const validKeys = entityConstructor._keyFields.map(field => field._fieldName);
  return Object.keys(keys).filter(key => !validKeys.includes(key));
}

function getNullishKeys(keys: MapType<FieldType>): string[] {
  return Object.entries(keys)
    .filter(([_, value]) => typeof value === 'undefined' || value === null)
    .map(([key]) => key);
}

function filterNonKeyProperties<EntityT extends Entity>(keys: MapType<FieldType>, entityConstructor: Constructable<EntityT>): MapType<FieldType> {
  const invalidKeys = getInvalidKeys(keys, entityConstructor);
  if (invalidKeys.length) {
    logger.warn(`There are too many key properties. Ignoring the following keys: ${invalidKeys.join(', ')}`);
    return Object.entries(keys)
      .filter(([key]) => !invalidKeys.includes(key))
      .reduce((validKeys, [key, value]) => ({ ...validKeys, [key]: value }), {});
  }

  return keys;
}

function keyToOData<EntityT extends Entity>(key: string, value: any, entityConstructor: Constructable<EntityT>): string {
  const edmType = entityConstructor[toStaticPropertyFormat(key)].edmType;
  return `${key}=${convertToUriFormat(value, edmType)}`;
}

function validateKeys<EntityT extends Entity>(keys: MapType<FieldType>, entityConstructor: Constructable<EntityT>): void {
  const missingKeys = getMissingKeys(keys, entityConstructor);
  if (missingKeys.length) {
    throw new Error(
      `Cannot get resource path for entity ${entityConstructor._entityName}. The following keys are missing: ${missingKeys.join(', ')}`
    );
  }

  const nullishKeys = getNullishKeys(keys);
  if (nullishKeys.length) {
    throw new Error(
      `Cannot get resource path for entity ${
        entityConstructor._entityName
      }. The following keys have nullish values, but are not nullable: ${nullishKeys.join(', ')}`
    );
  }
}
