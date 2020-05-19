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
import * as uriConverter from './uri-value-converter';

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export const oDataUri: ODataUri = {
  getExpand,
  getFilter: createGetFilter(uriConverter).getFilter,
  getEntityKeys,
  getOrderBy,
  getResourcePathForKeys: <EntityT extends Entity>(
    keys: MapType<FieldType> = {},
    entityConstructor: Constructable<EntityT>
  ) =>
    createGetResourcePathForKeys(uriConverter).getResourcePathForKeys(
      keys,
      entityConstructor
    ),
  getSelect,
  ...uriConverter
};
