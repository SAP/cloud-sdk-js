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
} from '@sap-cloud-sdk/odata-v2';
import type { TestEntityEndsWithApi } from './TestEntityEndsWithApi';

/**
 * This class represents the entity "A_TestEntityEndsWithCollection" of service "API_TEST_SRV".
 */
export class TestEntityEndsWith<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements TestEntityEndsWithType<T>
{
  /**
   * Technical entity name for TestEntityEndsWith.
   */
  static _entityName = 'A_TestEntityEndsWithCollection';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityEndsWith entity
   */
  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   */
  keyProperty!: DeserializedType<T, 'Edm.String'>;

  constructor(readonly _entityApi: TestEntityEndsWithApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntityEndsWithType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
