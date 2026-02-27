import { createODataUri as createODataUriBase } from '@sap-cloud-sdk/odata-common/internal';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';
import type {
  EntityApi,
  EntityBase,
  Expandable,
  ODataUri,
  Selectable
} from '@sap-cloud-sdk/odata-common/internal';
import type { DeSerializers } from '../de-serializers';
import type { Entity } from '../entity';

/**
 * Instance of the {@link ODataUri} conversion interface for OData v4.
 * @param deSerializers - DeSerializer instance used for conversions
 * @returns ODataUri
 * @internal
 */
export function createODataUri<DeSerializersT extends DeSerializers>(
  deSerializers: DeSerializersT
): ODataUri<DeSerializersT> {
  function getExpandWrapped<EntityT extends Entity>(
    selects: Selectable<EntityT, DeSerializersT>[],
    expands: Expandable<
      EntityT,
      DeSerializersT,
      EntityApi<EntityBase, DeSerializersT>
    >[],
    entityApi: EntityApi<Entity, DeSerializersT>
  ): Partial<{ expand: string }> {
    return getExpand(expands, entityApi);
  }

  // This enforces the same DeSerializersT on the getSelect function.
  // If we change something on the getSelect function signature this will fail in contrast to use of a type assertion "as typeof getSelect".
  const getSelectWithSameDeSerializer: <EntityT extends Entity>(
    selects: Selectable<EntityT, DeSerializersT>[]
  ) => Partial<{ select: string }> = getSelect;

  return createODataUriBase(
    deSerializers,
    getExpandWrapped,
    getSelectWithSameDeSerializer
  );
}
