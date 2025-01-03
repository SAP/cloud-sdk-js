/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v2';
import type { TestEntityEndsWithSomethingElseApi } from './TestEntityEndsWithSomethingElseApi';

/**
 * See https://api.sap.com/api/path for more information.
 */
export class TestEntityEndsWithSomethingElse<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityEndsWithSomethingElseType<T>
{
  /**
   * Technical entity name for TestEntityEndsWithSomethingElse.
   */
  static override _entityName = 'A_TestEntityEndsWithSomethingElse';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityEndsWithSomethingElse entity.
   */
  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   */
  declare keyProperty: DeserializedType<T, 'Edm.String'>;

  constructor(_entityApi: TestEntityEndsWithSomethingElseApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntityEndsWithSomethingElseType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
