import { EntityBase } from '../entity-base';
import { Selectable } from '../selectable';
import { Orderable } from '../order';
import { Filterable } from '../filter';
import { DeSerializers } from '../de-serializers';
import { EntityApi } from '../entity-api';

/**
 * Interface implemented by OData requests needing keys to identify an entity like `getByKey`, `delete` or `update`.
 */
export interface WithKeys {
  /**
   * Map containing the key name and value.
   */
  keys: Record<string, any>;
}

/**
 * Interface implemented by OData requests returning data like `getAll` or `getByKey`.
 */
export interface WithSelection<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> {
  /**
   * Select a list of fields on the `schema` property of the entity api.
   */
  selects: Selectable<EntityT, DeSerializersT>[];
}

/**
 * Interface representing options on a getAll request like top or orderBy.
 */
export interface WithGetAllRestrictions<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> extends WithSelection<EntityT, DeSerializersT> {
  /**
   * Limit the number of results to the given number.
   */
  top: number;
  /**
   * Skip a number of results in the requested set.
   */
  skip: number;
  /**
   * Filter the results based on conditions.
   */
  filter: Filterable<EntityT, DeSerializersT>;
  /**
   * Order the results in, e.g., `asc` or `desc` order.
   */
  orderBy: Orderable<EntityT, EntityApi<EntityBase>>[];
}

/**
 * Interface implemented by OData requests needing `ETags`to avoid conflicts in the persisted data like `update` or `delete`.
 */
export interface WithETag {
  /**
   * Version identifier.
   */
  eTag: string;
  /**
   * Ignore the version identifier if set to true.
   */
  versionIdentifierIgnored: boolean;
}

/**
 * Interface implemented by OData requests needing identifier to reference an entity for a batch request like `create`, `delete`, `getByKey`, `update` or `bound actions/functions`.
 */
export interface BatchReference {
  /**
   * Batch reference identifier.
   */
  id: string;
}

/**
 * Interface implemented by OData requests defining the getter and setter for the batch reference.
 */
export interface WithBatchReference {
  /**
   * Getter for the batch reference.
   */
  getBatchReference: () => BatchReference;
  /**
   * Setter for the batch reference.
   */
  setBatchId: (id: string) => void;
}

/**
 * Typeguard for the WithETag config.
 * @param config - Config to be checked
 * @returns boolean
 * @internal
 */
export function isWithETag(config: any): config is WithETag {
  return 'eTag' in config || 'versionIdentifierIgnored' in config;
}
