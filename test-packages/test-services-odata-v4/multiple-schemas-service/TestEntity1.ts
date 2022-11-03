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
import { TestComplexType1, TestComplexType1Field } from './TestComplexType1';
import type { TestEntity1Api } from './TestEntity1Api';
import { TestEnumType1 } from './TestEnumType1';

/**
 * This class represents the entity "A_TestEntity1" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
export class TestEntity1<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements TestEntity1Type<T>
{
  /**
   * Technical entity name for TestEntity1.
   */
  static _entityName = 'A_TestEntity1';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntity1 entity
   */
  static _keys = ['KeyPropertyString'];
  /**
   * Key Property String.
   */
  keyPropertyString!: DeserializedType<T, 'Edm.String'>;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  /**
   * Enum Property.
   * @nullable
   */
  enumProperty?: TestEnumType1 | null;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType1<T> | null;

  constructor(readonly _entityApi: TestEntity1Api<T>) {
    super(_entityApi);
  }
}

export interface TestEntity1Type<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  enumProperty?: TestEnumType1 | null;
  complexTypeProperty?: TestComplexType1<T> | null;
}
