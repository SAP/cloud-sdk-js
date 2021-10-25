import { Entity } from '../entity';
import {Selectable} from "../selectable/selectable";
import {Filterable} from "../filter/filterable";
import {Orderable} from "../order/orderable";
import {FieldType} from "../selectable/field";


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
