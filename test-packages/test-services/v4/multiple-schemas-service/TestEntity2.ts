/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v4';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';

/**
 * This class represents the entity "A_TestEntity2" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export class TestEntity2<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntity2Type<T> {
  /**
   * Technical entity name for TestEntity2.
   */
  static _entityName = 'A_TestEntity2';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntity2 entity
   */
  static _keys = ['KeyPropertyString'];
  /**
   * Key Property String.
   */
  keyPropertyString!: DeserializedType<T, 'Edm.String'>;
  /**
   * Single Property.
   * @nullable
   */
  singleProperty?: DeserializedType<T, 'Edm.Single'> | null;
}

export interface TestEntity2Type<T extends DeSerializers = DefaultDeSerializers> {
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
  singleProperty?: DeserializedType<T, 'Edm.Single'> | null;
}
