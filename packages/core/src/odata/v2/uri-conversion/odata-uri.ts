/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import {
  getEntityKeys,
  getOrderBy,
  ODataUri,
  FieldType,
  Constructable,
  createGetResourcePathForKeys,
  createGetFilter
} from '../../common';
import { Entity } from '../entity';
import { convertToUriForEdmString } from '../../common/uri-conversion/uri-value-converter';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';
import { convertToUriFormat } from './uri-value-converter';

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export const oDataUri: ODataUri = {
  getExpand,
  getFilter: createGetFilter({ convertToUriFormat, convertToUriForEdmString })
    .getFilter,
  getEntityKeys,
  getOrderBy,
  getResourcePathForKeys: <EntityT extends Entity>(
    keys: MapType<FieldType> = {},
    entityConstructor: Constructable<EntityT>
  ) =>
    createGetResourcePathForKeys({
      convertToUriFormat,
      convertToUriForEdmString
    }).getResourcePathForKeys(keys, entityConstructor),
  getSelect,
  convertToUriFormat,
  convertToUriForEdmString
};
