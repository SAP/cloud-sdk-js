import {
  createLogger,
  isNullish,
  upperCaseSnakeCase
} from '@sap-cloud-sdk/util';
import { EntityBase, Constructable, EntityApi } from '../entity-base';
import { UriConverter } from '../de-serializers';

const logger = createLogger({
  package: 'odata-common',
  messageContext: 'get-resource-path'
});

type GetResourcePathForKeysType<EntityT extends EntityBase> = (
  keys: Record<string, any>,
  entityApi: EntityApi<EntityT, any>
) => string;

interface GetResourcePathForKeys<EntityT extends EntityBase = any> {
  getResourcePathForKeys: GetResourcePathForKeysType<EntityT>;
}

/**
 * Creates a getResourcePathForKeys function using the OData v2 or OData v4 URI converter.
 * The concrete instances for v2 or v4 are initiated in odata/v2/uri-conversion/odata-uri.ts and odata/v4/uri-conversion/odata-uri.ts.
 * @param uriConverter - Uri converter for v2 or v4.
 * @returns The filter getter. See [[GetFilter]]
 * @internal
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
  function getResourcePathForKeys<EntityT extends EntityBase>(
    keys: Record<string, any> = {},
    { entityConstructor, schema }: EntityApi<EntityT, any>
  ): string {
    keys = filterNonKeyProperties(keys, entityConstructor);
    validateKeys(keys, entityConstructor);

    if (Object.keys(keys).length) {
      const byKey = Object.entries(keys)
        .map(([key, value]) => keyToOData(key, value, schema))
        .join(',');
      return `${entityConstructor._entityName}(${byKey})`;
    }

    return entityConstructor._entityName;
  }

  function getMissingKeys<EntityT extends EntityBase>(
    keys: Record<string, any>,
    entityConstructor: Constructable<EntityT>
  ): string[] {
    const givenKeys = Object.keys(keys);
    return entityConstructor._keys
      .map(key => key)
      .filter(fieldName => !givenKeys.includes(fieldName));
  }

  function getInvalidKeys<EntityT extends EntityBase>(
    keys: Record<string, any>,
    entityConstructor: Constructable<EntityT>
  ): string[] {
    return Object.keys(keys).filter(
      key => !entityConstructor._keys.includes(key)
    );
  }

  function getNullishKeys(keys: Record<string, any>): string[] {
    return Object.entries(keys)
      .filter(([, value]) => isNullish(value))
      .map(([key]) => key);
  }

  function filterNonKeyProperties<EntityT extends EntityBase>(
    keys: Record<string, any>,
    entityConstructor: Constructable<EntityT>
  ): Record<string, any> {
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

  function keyToOData(
    key: string,
    value: any,
    schema: Record<string, any>
  ): string {
    const edmType = schema[upperCaseSnakeCase(key)].edmType;
    return `${key}=${uriConverter(value, edmType)}`;
  }

  function validateKeys<EntityT extends EntityBase>(
    keys: Record<string, any>,
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
