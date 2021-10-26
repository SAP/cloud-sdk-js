import {
  createGetFilter,
  createGetResourcePathForKeys,
  getOrderBy,
  ODataUri,
  getEntityKeys
} from '@sap-cloud-sdk/odata-common';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';
import { uriConverter } from './uri-value-converter';

const { getFilter } = createGetFilter(uriConverter);
const { getResourcePathForKeys } = createGetResourcePathForKeys(uriConverter);
const { convertToUriFormat } = uriConverter;

/**
 * Instance of the [[ODataUri]] conversion interface for OData v4.
 * @internal
 */
export const oDataUri: ODataUri = {
  getExpand: (_, expands, entityConstructor) =>
    getExpand(expands, entityConstructor),
  getFilter,
  getEntityKeys,
  getOrderBy,
  getResourcePathForKeys,
  getSelect,
  convertToUriFormat
};
