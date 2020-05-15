/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import {
  getEntityKeys,
  getOrderBy,
  ODataUri,
  FieldType,
  Constructable,
  createGetResourcePathForKeys,
  Filterable,
  createGetFilter
} from '../../common';
import { Entity } from '../entity';
import { getExpand } from './get-expand';
import { getSelect } from './get-select';
import * as uriConverter from './uri-value-converter';

export const oDataUri: ODataUri = {
  getExpand,
  getFilter: <EntityT extends Entity>(
    filter: Filterable<EntityT>,
    entityConstructor: Constructable<EntityT>
  ) => createGetFilter(uriConverter).getFilter(filter, entityConstructor),
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
