import {
  createODataUri as createODataUriBase,
  ODataUri
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getExpandWrapped = (selects, expands, entityConstructor) =>
  getExpand(expands, entityConstructor);

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
