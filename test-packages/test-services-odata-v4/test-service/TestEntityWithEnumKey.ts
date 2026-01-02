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
import type { TestEntityWithEnumKeyApi } from './TestEntityWithEnumKeyApi';
import { TestEnumType } from './TestEnumType';

/**
 * See https://api.sap.com/api/path for more information.
 */
export class TestEntityWithEnumKey<
  T extends DeSerializers = DefaultDeSerializers
>
  extends Entity
  implements TestEntityWithEnumKeyType<T>
{
  /**
   * Technical entity name for TestEntityWithEnumKey.
   */
  static override _entityName = 'A_TestEntityWithEnumKey';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityWithEnumKey entity.
   */
  static _keys = ['KeyPropertyEnum1'];
  /**
   * Key Property Enum 1.
   */
  declare keyPropertyEnum1: TestEnumType;

  constructor(_entityApi: TestEntityWithEnumKeyApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntityWithEnumKeyType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyPropertyEnum1: TestEnumType;
}
