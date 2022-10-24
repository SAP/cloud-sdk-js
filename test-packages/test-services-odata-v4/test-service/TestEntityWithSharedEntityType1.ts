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
import type { TestEntityWithSharedEntityType1Api } from './TestEntityWithSharedEntityType1Api';

/**
 * This class represents the entity "A_TestEntityWithSharedEntityType1" of service "API_TEST_SRV".
 */
export class TestEntityWithSharedEntityType1<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityWithSharedEntityType1Type<T>
{
  /**
   * Technical entity name for TestEntityWithSharedEntityType1.
   */
  static _entityName = 'A_TestEntityWithSharedEntityType1';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityWithSharedEntityType1 entity
   */
  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty!: DeserializedType<T, 'Edm.String'>;

  constructor(readonly _entityApi: TestEntityWithSharedEntityType1Api<T>) {
    super(_entityApi);
  }
}

export interface TestEntityWithSharedEntityType1Type<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
