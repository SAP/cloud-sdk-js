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
  static override _entityName = 'A_TestEntity1';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntity1 entity.
   */
  static _keys = ['KeyPropertyString'];
  /**
   * Key Property String.
   */
  declare keyPropertyString: DeserializedType<T, 'Edm.String'>;
  /**
   * Int 16 Property.
   * @nullable
   */
  declare int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  /**
   * Enum Property.
   * @nullable
   */
  declare enumProperty?: TestEnumType1 | null;
  /**
   * Complex Type Property.
   * @nullable
   */
  declare complexTypeProperty?: TestComplexType1<T> | null;

  constructor(_entityApi: TestEntity1Api<T>) {
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
