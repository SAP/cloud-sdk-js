import { EntityBase } from '../entity-base';
import { Selectable } from '../selectable';
import { Orderable } from '../order';
import { Filterable } from '../filter';
import { DeSerializers } from '../de-serializers';
import {EntityApi} from "../entity-api";

/**
 * @internal
 */
export interface WithKeys {
  keys: Record<string, any>;
}

/**
 * @internal
 */
export interface WithSelection<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> {
  selects: Selectable<EntityT, DeSerializersT>[];
}

/**
 * @internal
 */
export interface WithGetAllRestrictions<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> extends WithSelection<EntityT, DeSerializersT> {
  top: number;
  skip: number;
  filter: Filterable<EntityT, DeSerializersT>;
  orderBy: Orderable<
    EntityT,
    DeSerializersT,
    EntityApi<EntityBase, DeSerializersT>
  >[];
}

/**
 * @internal
 */
export interface WithETag {
  eTag: string;
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
