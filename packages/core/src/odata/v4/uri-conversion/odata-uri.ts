/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  createGetFilter,
  createGetResourcePathForKeys,
  getEntityKeys,
  getOrderBy,
  ODataUri
} from '../../common';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';
import { uriConverter } from './uri-value-converter';

const { getFilter } = createGetFilter(uriConverter);
const { getResourcePathForKeys } = createGetResourcePathForKeys(uriConverter);
const { convertToUriFormat } = uriConverter;

/**
 * Instance of the [[ODataUri]] conversion interface for OData v4.
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
