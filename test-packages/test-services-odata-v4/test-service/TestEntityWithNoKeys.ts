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
import type { TestEntityWithNoKeysApi } from './TestEntityWithNoKeysApi';

/**
 * See https://api.sap.com/api/path for more information.
 */
export class TestEntityWithNoKeys<
  T extends DeSerializers = DefaultDeSerializers
>
  extends Entity
  implements TestEntityWithNoKeysType<T>
{
  /**
   * Technical entity name for TestEntityWithNoKeys.
   */
  static override _entityName = 'A_TestEntityWithNoKeys';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityWithNoKeys entity.
   */
  static _keys = [];
  /**
   * Normal Property.
   * @nullable
   */
  declare normalProperty?: DeserializedType<T, 'Edm.String'> | null;

  constructor(_entityApi: TestEntityWithNoKeysApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntityWithNoKeysType<
  T extends DeSerializers = DefaultDeSerializers
> {
  normalProperty?: DeserializedType<T, 'Edm.String'> | null;
}
