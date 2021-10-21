import { createLogger, isNullish } from '@sap-cloud-sdk/util';
import { Entity, Constructable } from '../entity';
import { FieldType, Field } from '../selectable';
import { UriConverter } from './index';
import { toStaticPropertyFormat } from '../name-converter';

const logger = createLogger({
  package: 'core',
  messageContext: 'get-resource-path'
});

type GetResourcePathForKeysType<EntityT extends Entity> = (
  keys: Record<string, FieldType>,
  entityConstructor: Constructable<EntityT>
) => string;

interface GetResourcePathForKeys<EntityT extends Entity = any> {
  getResourcePathForKeys: GetResourcePathForKeysType<EntityT>;
}

/**
 * Creates a getResourcePathForKeys function using the OData v2 or OData v4 URI converter.
 * The concrete instances for v2 or v4 are initiated in odata/v2/uri-conversion/odata-uri.ts and odata/v4/uri-conversion/odata-uri.ts.
 * @param uriConverter - Uri converter for v2 or v4.
 * @returns The filter getter. See [[GetFilter]]
 */
export function createGetResourcePathForKeys(
  uriConverter: UriConverter
): GetResourcePathForKeys {
  /**
   * Get the resource path of an entity specified by key-value pairs.
   * @typeparam EntityT - Type of the entity to get the resource path for
   * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value
   * @param entityConstructor - Constructor type of the entity to get the resource path for
   * @param uriConverter - OData version specific converter for strings in URIs
   * @returns The path to the resource
   */
  function getResourcePathForKeys<EntityT extends Entity>(
    keys: Record<string, FieldType> = {},
    entityConstructor: Constructable<EntityT>
  ): string {
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

  function getMissingKeys<EntityT extends Entity>(
    keys: Record<string, FieldType>,
    entityConstructor: Constructable<EntityT>
  ): string[] {
    const givenKeys = Object.keys(keys);
    return (entityConstructor._keyFields as Field<EntityT>[]) // type assertion for backwards compatibility, TODO: remove in v2.0
      .map(field => field._fieldName)
      .filter(fieldName => !givenKeys.includes(fieldName));
  }

  function getInvalidKeys<EntityT extends Entity>(
    keys: Record<string, FieldType>,
    entityConstructor: Constructable<EntityT>
  ): string[] {
    // type assertion for backwards compatibility, TODO: remove in v2.0
    const validKeys = (entityConstructor._keyFields as Field<EntityT>[]).map(
      field => field._fieldName
    );
    return Object.keys(keys).filter(key => !validKeys.includes(key));
  }

  function getNullishKeys(keys: Record<string, FieldType>): string[] {
    return Object.entries(keys)
      .filter(([, value]) => isNullish(value))
      .map(([key]) => key);
  }

  function filterNonKeyProperties<EntityT extends Entity>(
    keys: Record<string, FieldType>,
    entityConstructor: Constructable<EntityT>
  ): Record<string, FieldType> {
    const invalidKeys = getInvalidKeys(keys, entityConstructor);
    if (invalidKeys.length) {
      logger.warn(
        `There are too many key properties. Ignoring the following keys: ${invalidKeys.join(
          ', '
        )}`
      );
      return Object.entries(keys)
        .filter(([key]) => !invalidKeys.includes(key))
        .reduce(
          (validKeys, [key, value]) => ({ ...validKeys, [key]: value }),
          {}
        );
    }

    return keys;
  }

  function keyToOData<EntityT extends Entity>(
    key: string,
    value: any,
    entityConstructor: Constructable<EntityT>
  ): string {
    const edmType = entityConstructor[toStaticPropertyFormat(key)].edmType;
    return `${key}=${uriConverter.convertToUriFormat(value, edmType)}`;
  }

  function validateKeys<EntityT extends Entity>(
    keys: Record<string, FieldType>,
    entityConstructor: Constructable<EntityT>
  ): void {
    const missingKeys = getMissingKeys(keys, entityConstructor);
    if (missingKeys.length) {
      throw new Error(
        `Cannot get resource path for entity ${
          entityConstructor._entityName
        }. The following keys are missing: ${missingKeys.join(', ')}`
      );
    }

    const nullishKeys = getNullishKeys(keys);
    if (nullishKeys.length) {
      throw new Error(
        `Cannot get resource path for entity ${
          entityConstructor._entityName
        }. The following keys have nullish values, but are not nullable: ${nullishKeys.join(
          ', '
        )}`
      );
    }
  }

  return { getResourcePathForKeys };
}
