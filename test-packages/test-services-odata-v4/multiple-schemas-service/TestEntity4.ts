/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntity4Api } from './TestEntity4Api';

/**
 * This class represents the entity "A_TestEntity4" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export class TestEntity4<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements TestEntity4Type<T>
{
  /**
   * Technical entity name for TestEntity4.
   */
  static _entityName = 'A_TestEntity4';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntity4 entity
   */
  static _keys = ['KeyPropertyString'];
  /**
   * Key Property String.
   */
  keyPropertyString!: DeserializedType<T, 'Edm.String'>;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;

  constructor(readonly _entityApi: TestEntity4Api<T>) {
    super(_entityApi);
  }
}

export interface TestEntity4Type<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
}
