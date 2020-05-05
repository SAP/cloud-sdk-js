/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity, EntityBuilderType, EntityBuilderTypeODataV4, EntityODataV4 } from './entity';
import { RequestBuilder, RequestBuilderODataV4 } from './request-builder/request-builder';
import { CustomField, CustomFieldODataV4, Selectable, SelectableODataV4 } from './selectable';

/**
 * @hidden
 */
export interface Constructable<
  EntityT extends Entity,
  EntityTypeForceMandatoryT = {}
> {
  _serviceName: string;
  _entityName: string;
  _defaultServicePath: string;
  _allFields: Selectable<EntityT>[];
  _keyFields: Selectable<EntityT>[];
  _keys: { [keys: string]: Selectable<EntityT> };
  new (...args: any[]): EntityT;
  requestBuilder(): RequestBuilder<EntityT>;
  builder(): EntityBuilderType<EntityT, EntityTypeForceMandatoryT>;
  customField(fieldName: string): CustomField<EntityT>;
}

export interface ConstructableODataV4<
  EntityT extends EntityODataV4,
  EntityTypeForceMandatoryT = {}
  > {
  _serviceName: string;
  _entityName: string;
  _defaultServicePath: string;
  _allFields: SelectableODataV4<EntityT>[];
  _keyFields: SelectableODataV4<EntityT>[];
  _keys: { [keys: string]: SelectableODataV4<EntityT> };
  new (...args: any[]): EntityT;
  requestBuilder(): RequestBuilderODataV4<EntityT>;
  builder(): EntityBuilderTypeODataV4<EntityT, EntityTypeForceMandatoryT>;
  customField(fieldName: string): CustomFieldODataV4<EntityT>;
}
