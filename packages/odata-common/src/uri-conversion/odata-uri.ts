import { Expandable } from '../expandable';
import { EntityBase, EntityApi } from '../entity-base';
import { EdmTypeShared } from '../edm-types';
import { Selectable } from '../selectable';
import { Orderable } from '../order';
import { Filterable } from '../filter';
import { createUriConverter, DeSerializers } from '../de-serializers';
import { getEntityKeys } from './get-keys';
import { getOrderBy } from './get-orderby';
import { createGetFilter } from './get-filter';
import { createGetResourcePathForKeys } from './get-resource-path';
import {inferEntity} from "../helper-types";

/**
 * @internal
 * Union of necessary methods for the OData URI conversion.
 * In v2/uri-conversion/odata-uri.ts and v4/uri-conversion/odata-uri.ts the instance for v2 and v4 are created.
 */
export interface ODataUri<DeSerializersT extends DeSerializers> {
  getExpand<EntityT extends EntityBase>(
    selects: Selectable<EntityT, DeSerializersT>[],
    expands: Expandable<EntityT, DeSerializersT,EntityApi<EntityBase,DeSerializersT>>[],
    entityApi: EntityApi<EntityT, DeSerializersT>
  ): Partial<{ expand: string }>;
  getFilter<EntityT extends EntityBase>(
    filter: Filterable<EntityT, DeSerializersT,EntityApi<EntityBase,DeSerializersT>>,
    entityApi: EntityApi<EntityT, DeSerializersT>
  ): Partial<{ filter: string }>;
  getEntityKeys<EntityT extends EntityBase>(
    entity: EntityT,
    entityApi: EntityApi<EntityT,DeSerializersT>
  ): Record<string, any>;
  getOrderBy<EntityT extends EntityBase>(
    orderBy: Orderable<EntityT,DeSerializersT,EntityApi<EntityBase,DeSerializersT>>[]
  ): Partial<{ orderby: string }>;
  getResourcePathForKeys<EntityT extends EntityBase>(
    keys: Record<string, any>,
    _entityApi: EntityApi<EntityT, DeSerializersT>
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
 * @internal
 * Add a dollar to a string.
 * @param param - String to be modified.
 * @returns The given string starting with a dollar.
 */
export function prependDollar(param: string): string {
  return `$${param}`;
}

/**
 * @internal
 * @param deSerializers - (De-)serializers used for transformation.
 * @param getExpand - `getExpand` function.
 * @param getSelect - `getSelect`function.
 * @returns An instance of ODataUri
 */
export function createODataUri<DeSerializersT extends DeSerializers>(
  deSerializers: DeSerializersT,
  getExpand: <EntityT extends EntityBase>(
    selects: Selectable<EntityT, DeSerializersT>[],
    expands: Expandable<EntityT, DeSerializersT,EntityApi<EntityBase,DeSerializersT>>[],
    entityApi: EntityApi<EntityT, DeSerializersT>
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
