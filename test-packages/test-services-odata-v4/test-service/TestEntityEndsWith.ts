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
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntityEndsWithApi } from './TestEntityEndsWithApi';

/**
 * See https://api.sap.com/api/path for more information.
 */
export class TestEntityEndsWith<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements TestEntityEndsWithType<T>
{
  /**
   * Technical entity name for TestEntityEndsWith.
   */
  static override _entityName = 'A_TestEntityEndsWithCollection';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityEndsWith entity.
   */
  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  declare keyProperty: DeserializedType<T, 'Edm.String'>;

  constructor(_entityApi: TestEntityEndsWithApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntityEndsWithType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
