import {
  ODataUri,
  createODataUri as createODataUriBase,
  DeSerializers
} from '@sap-cloud-sdk/odata-common/internal';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getExpandWrapped(selects, expands, entityConstructor) {
  return getExpand(selects);
}

/**
 * Instance of the [[ODataUri]] conversion interface for OData v2.
 * @param deSerializers - (De-)serializers used for transformation.
 * @returns TODO
 * @internal
 */
export function createODataUri<DeSerializersT extends DeSerializers>(
  deSerializers: DeSerializersT
): ODataUri<DeSerializersT> {
  return createODataUriBase(deSerializers, getExpandWrapped, getSelect);
}
