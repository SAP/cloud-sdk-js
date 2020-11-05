import {
  getEntityKeys,
  getOrderBy,
  ODataUri,
  createGetResourcePathForKeys,
  createGetFilter
} from '../../odata-common';
import { getExpandV2 } from './get-expand';
import { getSelectV2 } from './get-select';
import { uriConverterV2 } from './uri-value-converter';

const { getFilter } = createGetFilter(uriConverterV2);
const { getResourcePathForKeys } = createGetResourcePathForKeys(uriConverterV2);
const { convertToUriFormat } = uriConverterV2;

/**
 * Instance of the [[ODataUri]] conversion interface for OData v2.
 */
export const oDataUriV2: ODataUri = {
  getExpand: getExpandV2,
  getFilter,
  getEntityKeys,
  getOrderBy,
  getResourcePathForKeys,
  getSelect: getSelectV2,
  convertToUriFormat
};

export { oDataUriV2 as oDataUri };
