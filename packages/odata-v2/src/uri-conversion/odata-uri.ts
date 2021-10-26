import {
  getEntityKeys,
  getOrderBy,
  ODataUri as ODataUriBase,
  createGetResourcePathForKeys,
  createGetFilter
} from '@sap-cloud-sdk/odata-common';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';
import { uriConverter } from './uri-value-converter';

const { getFilter } = createGetFilter(uriConverter);
const { getResourcePathForKeys } = createGetResourcePathForKeys(uriConverter);
const { convertToUriFormat } = uriConverter;

/**
 * Instance of the [[ODataUri]] conversion interface for OData v2.
 */
export const oDataUri: ODataUriBase = {
  getExpand,
  getFilter,
  getEntityKeys,
  getOrderBy,
  getResourcePathForKeys,
  getSelect,
  convertToUriFormat
};
