import { Expandable } from '../expandable';
import { EntityBase, Constructable } from '../entity-base';
import { EdmTypeShared } from '../edm-types';
import { Filterable } from '../filter/filterable';
import { Selectable } from '../selectable/selectable';
import { Orderable } from '../order/orderable';
import { FieldType } from '../selectable/field';
import { UriConverter } from '../de-serializers';
import { getEntityKeys } from './get-keys';
import { getOrderBy } from './get-orderby';
import { createGetFilter } from './get-filter';
import { createGetResourcePathForKeys } from './get-resource-path';

/**
 * Union of necessary methods for the OData URI conversion.
 * In v2/uri-conversion/odata-uri.ts and v4/uri-conversion/odata-uri.ts the instance for v2 and v4 are created.
 * @internal
 */
export interface ODataUri {
  getExpand<EntityT extends EntityBase>(
    selects: Selectable<EntityT>[],
    expands: Expandable<EntityT>[],
    entityConstructor: Constructable<EntityT>
  ): Partial<{ expand: string }>;
  getFilter<EntityT extends EntityBase>(
    filter: Filterable<EntityT>,
    entityConstructor: Constructable<EntityT>
  ): Partial<{ filter: string }>;
  getEntityKeys<EntityT extends EntityBase>(
    entity: EntityT,
    entityConstructor: Constructable<EntityT>
  ): Record<string, any>;
  getOrderBy<EntityT extends EntityBase>(
    orderBy: Orderable<EntityT>[]
  ): Partial<{ orderby: string }>;
  getResourcePathForKeys<EntityT extends EntityBase>(
    keys: Record<string, FieldType>,
    entityConstructor: Constructable<EntityT>
  ): string;
  getSelect<EntityT extends EntityBase>(
    selects: Selectable<EntityT>[]
  ): Partial<{ select: string }>;
  convertToUriFormat(
    value: any,
    edmType: EdmTypeShared<'v2'> | EdmTypeShared<'v4'>
  ): string;
}

/**
 * Add a dollar to a string
 * @param param - String to be modified.
 * @returns string containing the dollar
 * @internal
 */
export function prependDollar(param: string): string {
  return `$${param}`;
}

/**
 * @param uriConverter - uriConverter
 * @param getExpand - getExpand
 * @param getSelect - getSelect
 * @returns An ODataURI
 * @internal
 */
export function createODataUri(
  uriConverter: UriConverter,
  getExpand: <EntityT extends EntityBase>(
    selects: Selectable<EntityT>[],
    expands: Expandable<EntityT>[],
    entityConstructor: Constructable<EntityT>
  ) => Partial<{ expand: string }>,

  getSelect: <EntityT extends EntityBase>(
    selects: Selectable<EntityT>[]
  ) => Partial<{ select: string }>
): ODataUri {
  const { getFilter } = createGetFilter(uriConverter);
  const { getResourcePathForKeys } = createGetResourcePathForKeys(uriConverter);
  const { convertToUriFormat } = uriConverter;

  return {
    getExpand,
    getFilter,
    getEntityKeys,
    getOrderBy,
    getResourcePathForKeys,
    getSelect,
    convertToUriFormat
  };
}
