/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntityWithEnumKeyApi } from './TestEntityWithEnumKeyApi';
import { TestEnumType } from './TestEnumType';
/**
 * See https://api.sap.com/api/path for more information.
 */
export declare class TestEntityWithEnumKey<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityWithEnumKeyType<T>
{
  /**
   * Technical entity name for TestEntityWithEnumKey.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the TestEntityWithEnumKey entity.
   */
  static _keys: string[];
  /**
   * Key Property Enum 1.
   */
  keyPropertyEnum1: TestEnumType;
  constructor(_entityApi: TestEntityWithEnumKeyApi<T>);
}
export interface TestEntityWithEnumKeyType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyPropertyEnum1: TestEnumType;
}
