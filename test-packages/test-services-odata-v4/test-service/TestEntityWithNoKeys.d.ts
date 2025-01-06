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
import type { TestEntityWithNoKeysApi } from './TestEntityWithNoKeysApi';
/**
 * See https://api.sap.com/api/path for more information.
 */
export declare class TestEntityWithNoKeys<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityWithNoKeysType<T>
{
  /**
   * Technical entity name for TestEntityWithNoKeys.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the TestEntityWithNoKeys entity.
   */
  static _keys: never[];
  /**
   * Normal Property.
   * @nullable
   */
  normalProperty?: DeserializedType<T, 'Edm.String'> | null;
  constructor(_entityApi: TestEntityWithNoKeysApi<T>);
}
export interface TestEntityWithNoKeysType<
  T extends DeSerializers = DefaultDeSerializers
> {
  normalProperty?: DeserializedType<T, 'Edm.String'> | null;
}
