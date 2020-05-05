/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity, EntityBuilderType } from './entity';
import { RequestBuilder } from './request-builder/request-builder';
import { CustomField, Selectable } from './selectable';
import { ODataV2 } from './odata-v2';

/**
 * @hidden
 */
export interface Constructable<
  EntityT extends Entity<Version>,
  EntityTypeForceMandatoryT = {},
  Version = ODataV2
> {
  _serviceName: string;
  _entityName: string;
  _version: Version;
  _defaultServicePath: string;
  _allFields: Selectable<EntityT, Version>[];
  _keyFields: Selectable<EntityT, Version>[];
  _keys: { [keys: string]: Selectable<EntityT, Version> };
  new (...args: any[]): EntityT;
  requestBuilder(): RequestBuilder<EntityT, Version>;
  builder(): EntityBuilderType<EntityT, EntityTypeForceMandatoryT, Version>;
  customField(fieldName: string): CustomField<EntityT, Version>;
}
