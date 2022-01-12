import {
  createODataUri as createODataUriBase,
  EntityApi,
  EntityBase,
  Expandable,
  ODataUri,
  Selectable
} from '@sap-cloud-sdk/odata-common/internal';
import { inferEntity } from '@sap-cloud-sdk/odata-common';
import { DeSerializers } from '../de-serializers';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getExpandWrapped<
  EntityApiT extends EntityApi<EntityBase, DeSerializersT>,
  DeSerializersT extends DeSerializers
>(
  selects: Selectable<inferEntity<EntityApiT>, DeSerializersT>[],
  expands: Expandable<
    inferEntity<EntityApiT>,
    DeSerializersT,
    EntityApi<EntityBase, DeSerializersT>
  >[],
  entityApi: EntityApiT
): Partial<{ expand: string }> {
  return getExpand(expands, entityApi);
}

/**
 * Instance of the [[ODataUri]] conversion interface for OData v4.
 * @param deSerializers - DeSerializer instance used for conversions
 * @returns ODataUri
 * @internal
 */
export function createODataUri<DeSerializersT extends DeSerializers>(
  deSerializers: DeSerializersT
): ODataUri<DeSerializersT> {
  return createODataUriBase(deSerializers, getExpandWrapped, getSelect);
}
