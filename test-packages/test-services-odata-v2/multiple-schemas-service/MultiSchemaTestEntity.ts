/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v2';
import type { MultiSchemaTestEntityApi } from './MultiSchemaTestEntityApi';

/**
 * This class represents the entity "MultiSchemaTestEntity" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export class MultiSchemaTestEntity<
  T extends DeSerializers = DefaultDeSerializers
>
  extends Entity
  implements MultiSchemaTestEntityType<T>
{
  /**
   * Technical entity name for MultiSchemaTestEntity.
   */
  static override _entityName = 'MultiSchemaTestEntity';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/';
  /**
   * All key fields of the MultiSchemaTestEntity entity.
   */
  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   */
  declare keyProperty: DeserializedType<T, 'Edm.String'>;

  constructor(_entityApi: MultiSchemaTestEntityApi<T>) {
    super(_entityApi);
  }
}

export interface MultiSchemaTestEntityType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
