/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity, EntityBuilderType, EntityBuilderTypeV4 } from './entity';

import { ODataV4 } from './odata-v4';
import { Selectable } from './selectable-v4/selectable';
import { CustomField } from './selectable-v4/custom-field';
import { RequestBuilder } from './request-builder-v4/request-builder';
import { ODataV2 } from './odata-v2';

/**
 * @hidden
 */
export interface Constructable<
  EntityT extends Entity<ODataV4>,
  EntityTypeForceMandatoryT = {}
> {
  _serviceName: string;
  _entityName: string;
  _version:ODataV4;
  _defaultServicePath: string;
  _allFields: Selectable<EntityT>[];
  _keyFields: Selectable<EntityT>[];
  _keys: { [keys: string]: Selectable<EntityT> };
  new (...args: any[]): EntityT;
  requestBuilder(): RequestBuilder<EntityT>;
  builder(): EntityBuilderTypeV4<EntityT, EntityTypeForceMandatoryT>;
  customField(fieldName: string): CustomField<EntityT>;
}
