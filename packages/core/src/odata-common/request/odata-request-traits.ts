import { Entity } from '../entity';
import { Filterable } from '../filter';
import { Orderable } from '../order';
import { FieldType, Selectable } from '../selectable';

/**
 * @hidden
 */
export interface WithKeys {
  keys: Record<string, FieldType>;
}

/**
 * @hidden
 */
export interface WithSelection<EntityT extends Entity> {
  selects: Selectable<EntityT>[];
}

/**
 * @hidden
 */
export interface WithGetAllRestrictions<EntityT extends Entity>
  extends WithSelection<EntityT> {
  top: number;
  skip: number;
  filter: Filterable<EntityT>;
  orderBy: Orderable<EntityT>[];
}

/**
 * @hidden
 */
export interface WithETag {
  eTag: string;
  versionIdentifierIgnored: boolean;
}

export function isWithETag(config: any): config is WithETag {
  return 'eTag' in config || 'versionIdentifierIgnored' in config;
}
