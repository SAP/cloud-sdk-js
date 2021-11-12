import { createODataUri } from '@sap-cloud-sdk/odata-common';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';
import { uriConverter } from './uri-value-converter';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getExpandWrapped = (selects, expands, entityConstructor) =>
  getExpand(expands, entityConstructor);

/**
 * Instance of the [[ODataUri]] conversion interface for OData v2.
 */
export const oDataUri = createODataUri(
  uriConverter,
  getExpandWrapped,
  getSelect
);
