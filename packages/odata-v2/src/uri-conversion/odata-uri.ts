import {
  ODataUri,
  createODataUri as createODataUriBase
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializationMiddlewareBASE } from '@sap-cloud-sdk/odata-common/src/de-serializers/de-serialization-middleware';
import { UriConverter } from '@sap-cloud-sdk/odata-common/src/de-serializers/uri-value-converter';
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
export function createODataUri(
  deSerializers: DeSerializationMiddlewareBASE
): ODataUri {
  const uriConverter = new UriConverter(deSerializers);

  return createODataUriBase(uriConverter, getExpandWrapped, getSelect);
}
