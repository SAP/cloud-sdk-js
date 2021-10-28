import { EntityBase } from '../entity-base';
import { Selectable } from '../selectable/selectable';
import { Filterable } from '../filter/filterable';
import { Orderable } from '../order/orderable';
import { FieldType } from '../selectable/field';

/**
 * @internal
 */
export interface WithKeys {
  keys: Record<string, FieldType>;
}

/**
 * @internal
 */
export interface WithSelection<EntityT extends EntityBase> {
  selects: Selectable<EntityT>[];
}

/**
 * @internal
 */
export interface WithGetAllRestrictions<EntityT extends EntityBase>
  extends WithSelection<EntityT> {
  top: number;
  skip: number;
  filter: Filterable<EntityT>;
  orderBy: Orderable<EntityT>[];
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
