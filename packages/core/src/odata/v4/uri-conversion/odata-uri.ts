/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  createGetFilter,
  createGetResourcePathForKeys,
  getEntityKeys,
  getOrderBy,
  ODataUri
} from '../../common';
import { getExpandV4 } from './get-expand';
import { getSelectV4 } from './get-select';
import { uriConverterV4 } from './uri-value-converter';

const { getFilter } = createGetFilter(uriConverterV4);
const { getResourcePathForKeys } = createGetResourcePathForKeys(uriConverterV4);
const { convertToUriFormat } = uriConverterV4;

/**
 * Instance of the [[ODataUri]] conversion interface for OData v4.
 */
export const oDataUriV4: ODataUri = {
  getExpand: (_, expands, entityConstructor) =>
    getExpandV4(expands, entityConstructor),
  getFilter,
  getEntityKeys,
  getOrderBy,
  getResourcePathForKeys,
  getSelect: getSelectV4,
  convertToUriFormat
};
