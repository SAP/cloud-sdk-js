import {
  ODataUri,
  createODataUri as createODataUriBase,
  DeSerializers,
  createUriConverter
} from '@sap-cloud-sdk/odata-common/internal';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getExpandWrapped(selects, expands, entityConstructor) {
  return getExpand(selects);
}

/**
 * Instance of the [[ODataUri]] conversion interface for OData v2.
 * @param deSerializers - TODO
 * @returns TODO
 * @internal
 */
export function createODataUri(deSerializers: DeSerializers): ODataUri {
  const uriConverter = createUriConverter(deSerializers);

  return createODataUriBase(uriConverter, getExpandWrapped, getSelect);
}
