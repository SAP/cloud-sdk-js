/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity, EntityBuilderType } from './entity';
import { RequestBuilder } from './request-builder/request-builder';
import { CustomField, Field, Link } from './selectable';

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
  _allFields: (Field<EntityT> | Link<EntityT>)[];
  _keyFields: Field<EntityT>[];
  _keys: { [keys: string]: Field<EntityT> };
  new (...args: any[]): EntityT;
  requestBuilder(): RequestBuilder<EntityT>;
  builder(): EntityBuilderType<EntityT, EntityTypeForceMandatoryT>;
  customField(fieldName: string): CustomField<EntityT>;
}
