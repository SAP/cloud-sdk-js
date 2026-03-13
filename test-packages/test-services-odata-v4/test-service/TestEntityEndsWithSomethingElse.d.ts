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
import type { TestEntityEndsWithSomethingElseApi } from './TestEntityEndsWithSomethingElseApi';
/**
 * See https://api.sap.com/api/path for more information.
 */
export declare class TestEntityEndsWithSomethingElse<
  T extends DeSerializers = DefaultDeSerializers
>
  extends Entity
  implements TestEntityEndsWithSomethingElseType<T>
{
  /**
   * Technical entity name for TestEntityEndsWithSomethingElse.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the TestEntityEndsWithSomethingElse entity.
   */
  static _keys: string[];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
  constructor(_entityApi: TestEntityEndsWithSomethingElseApi<T>);
}
export interface TestEntityEndsWithSomethingElseType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
