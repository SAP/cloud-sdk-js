/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v4';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
import { TestComplexType2, TestComplexType2Field } from './TestComplexType2';
import { TestEnumType2 } from './TestEnumType2';

/**
 * This class represents the entity "A_TestEntity3" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export class TestEntity3<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntity3Type<T> {
  /**
   * Technical entity name for TestEntity3.
   */
  static _entityName = 'A_TestEntity3';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntity3 entity
   */
  static _keys = ['KeyPropertyString'];
  /**
   * Key Property String.
   */
  keyPropertyString!: DeserializedType<T, 'Edm.String'>;
  /**
   * Enum Property.
   * @nullable
   */
  enumProperty?: TestEnumType2 | null;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType2<T> | null;
}

export interface TestEntity3Type<T extends DeSerializers = DefaultDeSerializers> {
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
  enumProperty?: TestEnumType2 | null;
  complexTypeProperty?: TestComplexType2<T> | null;
}
