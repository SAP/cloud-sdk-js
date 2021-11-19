import {
  getEntityKeys,
  getOrderBy,
  ODataUri,
  createGetResourcePathForKeys,
  createGetFilter,
  UriConverter
} from '@sap-cloud-sdk/odata-common';
import { DeSerializationMiddlewareBASE } from '@sap-cloud-sdk/odata-common/src/de-serializers/de-serialization-middleware';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';

/**
 * Instance of the [[ODataUri]] conversion interface for OData v2.
 */

export function createODataUri(
  deSerializers: DeSerializationMiddlewareBASE
): ODataUri {
  const uriConverter = new UriConverter(deSerializers);
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
