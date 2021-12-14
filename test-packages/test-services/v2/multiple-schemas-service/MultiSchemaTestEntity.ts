/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v2';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';

/**
 * This class represents the entity "MultiSchemaTestEntity" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export class MultiSchemaTestEntity<T extends DeSerializers = DefaultDeSerializers> extends Entity implements MultiSchemaTestEntityType<T> {
  /**
   * Technical entity name for MultiSchemaTestEntity.
   */
  static _entityName = 'MultiSchemaTestEntity';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = 'VALUE_IS_UNDEFINED';
  /**
   * All key fields of the MultiSchemaTestEntity entity
   */
  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   */
  keyProperty!: DeserializedType<T, 'Edm.String'>;
}

export interface MultiSchemaTestEntityType<T extends DeSerializers = DefaultDeSerializers> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
