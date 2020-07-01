/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase, EntityBuilderType } from './entity';
import { RequestBuilder } from './request-builder/request-builder';
import { CustomFieldBase, Selectable, Field, Link } from './selectable';

/**
 * @hidden
 */
export interface Constructable<
  EntityT extends EntityBase,
  EntityTypeForceMandatoryT = {}
> {
  _serviceName: string;
  _entityName: string;
  _defaultServicePath: string;
  _allFields: (Selectable<EntityT> | Field<EntityT> | Link<EntityT>)[]; // Selectable only here for backwards TODO: Remove in v2.0
  _keyFields: (Selectable<EntityT> | Field<EntityT>)[]; // Selectable only here for backwards TODO: Remove in v2.0
  _keys: { [keys: string]: Selectable<EntityT> | Field<EntityT> }; // Selectable only here for backwards TODO: Remove in v2.0
  new (...args: any[]): EntityT;
  requestBuilder(): RequestBuilder<EntityT>;
  builder(): EntityBuilderType<EntityT, EntityTypeForceMandatoryT>;
  customField(fieldName: string): CustomFieldBase<EntityT>;
}
