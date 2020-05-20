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
import { getExpand } from './get-expand';
import { getSelect } from './get-select';
import { convertToUriFormat } from './uri-value-converter';

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export const oDataUri: ODataUri = {
  getExpand,
  getFilter: createGetFilter({ convertToUriFormat }).getFilter,
  getEntityKeys,
  getOrderBy,
  getResourcePathForKeys: <EntityT extends Entity>(
    keys: MapType<FieldType> = {},
    entityConstructor: Constructable<EntityT>
  ) =>
    createGetResourcePathForKeys({
      convertToUriFormat
    }).getResourcePathForKeys(keys, entityConstructor),
  getSelect,
  convertToUriFormat
};
