/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import {
  createGetResourcePathForKeys,
  getEntityKeys,
  getOrderBy,
  ODataUri,
  FieldType,
  Constructable
} from '../../common';
import { Entity } from '../entity';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';
import { convertToUriFormat } from './uri-value-converter';
import { getFilter } from './get-filter';

export const oDataUri: ODataUri = {
  getExpand: (_, expands, entityConstructor) =>
    getExpand(expands, entityConstructor),
  getFilter,
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
