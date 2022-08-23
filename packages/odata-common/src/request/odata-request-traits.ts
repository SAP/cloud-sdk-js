import { EntityBase } from '../entity-base';
import { Selectable } from '../selectable';
import { Orderable } from '../order';
import { Filterable } from '../filter';
import { DeSerializers } from '../de-serializers';
import { EntityApi } from '../entity-api';

/**
 * Interface implemented by OData requests needing keys to identify an entity like `getByKey`, `delete` or `update.
 */
export interface WithKeys {
  /**
   * TODO-JSDOC.
   */
  keys: Record<string, any>;
}

/**
 * Interface implemented by OData requests returning data like getAll or getByKey.
 */
export interface WithSelection<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> {
  /**
   * TODO-JSDOC.
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
   * TODO-JSDOC.
   */
  top: number;
  /**
   * TODO-JSDOC.
   */
  skip: number;
  /**
   * TODO-JSDOC.
   */
  filter: Filterable<EntityT, DeSerializersT>;
  /**
   * TODO-JSDOC.
   */
  orderBy: Orderable<EntityT, EntityApi<EntityBase>>[];
}

/**
 * Interface implemented by OData requests needing `ETags`to avoid conflicts in the persisted data like `update` or `delete`.
 */
export interface WithETag {
  /**
   * TODO-JSDOC.
   */
  eTag: string;
  /**
   * TODO-JSDOC.
   */
  versionIdentifierIgnored: boolean;
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
