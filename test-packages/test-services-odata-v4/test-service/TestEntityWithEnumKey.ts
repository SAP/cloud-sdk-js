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
import { TestEnumType } from './TestEnumType';

/**
 * This class represents the entity "A_TestEntityWithEnumKey" of service "API_TEST_SRV".
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
  static _entityName = 'A_TestEntityWithEnumKey';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityWithEnumKey entity
   */
  static _keys = ['KeyPropertyEnum1'];
  /**
   * Key Property Enum 1.
   */
  keyPropertyEnum1!: TestEnumType;
}

export interface TestEntityWithEnumKeyType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyPropertyEnum1: TestEnumType;
}
