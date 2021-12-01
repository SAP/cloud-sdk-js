import { Expandable } from '../expandable';
import { EntityBase, Constructable } from '../entity-base';
import { EdmTypeShared } from '../edm-types';
import { Selectable } from '../selectable';
import { Orderable } from '../order';
import { Filterable } from '../filter';
import { createUriConverter, DeSerializers } from '../de-serializers';
import { getEntityKeys } from './get-keys';
import { getOrderBy } from './get-orderby';
import { createGetFilter } from './get-filter';
import { createGetResourcePathForKeys } from './get-resource-path';

/**
 * Union of necessary methods for the OData URI conversion.
 * In v2/uri-conversion/odata-uri.ts and v4/uri-conversion/odata-uri.ts the instance for v2 and v4 are created.
 * @internal
 */
export interface ODataUri<DeSerializersT extends DeSerializers> {
  getExpand<EntityT extends EntityBase>(
    selects: Selectable<EntityT, DeSerializersT>[],
    expands: Expandable<EntityT, DeSerializersT>[],
    entityConstructor: Constructable<EntityT>
  ): Partial<{ expand: string }>;
  getFilter<EntityT extends EntityBase>(
    filter: Filterable<EntityT, DeSerializersT>,
    entityConstructor: Constructable<EntityT>
  ): Partial<{ filter: string }>;
  getEntityKeys<EntityT extends EntityBase>(
    entity: EntityT,
    entityConstructor: Constructable<EntityT>
  ): Record<string, any>;
  getOrderBy<EntityT extends EntityBase>(
    orderBy: Orderable<EntityT, DeSerializersT>[]
  ): Partial<{ orderby: string }>;
  getResourcePathForKeys<EntityT extends EntityBase>(
    keys: Record<string, any>,
    entityConstructor: Constructable<EntityT>
  ): string;
  getSelect<EntityT extends EntityBase>(
    selects: Selectable<EntityT, DeSerializersT>[]
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
export function createODataUri<DeSerializersT extends DeSerializers>(
  deSerializers: DeSerializersT,
  getExpand: <EntityT extends EntityBase>(
    selects: Selectable<EntityT, DeSerializersT>[],
    expands: Expandable<EntityT, DeSerializersT>[],
    entityConstructor: Constructable<EntityT>
  ) => Partial<{ expand: string }>,

  getSelect: <EntityT extends EntityBase>(
    selects: Selectable<EntityT, DeSerializersT>[]
  ) => Partial<{ select: string }>
): ODataUri<DeSerializersT> {
  const uriConverter = createUriConverter(deSerializers);

  const { getFilter } = createGetFilter(uriConverter);
  const { getResourcePathForKeys } = createGetResourcePathForKeys(uriConverter);
  const convertToUriFormat = uriConverter;

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
