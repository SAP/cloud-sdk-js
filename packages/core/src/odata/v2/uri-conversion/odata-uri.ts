/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  getEntityKeys,
  getOrderBy,
  ODataUri,
  createGetResourcePathForKeys,
  createGetFilter
} from '../../common';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';
import { uriConverter } from './uri-value-converter';

const { getFilter } = createGetFilter(uriConverter);
const { getResourcePathForKeys } = createGetResourcePathForKeys(uriConverter);
const { convertToUriFormat } = uriConverter;

/**
 * Instance of the [[ODataUri]] conversion interface for OData v2.
 */
export const oDataUri: ODataUri = {
  getExpand,
  getFilter,
  getEntityKeys,
  getOrderBy,
  getResourcePathForKeys,
  getSelect,
  convertToUriFormat
};
