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
import type { TestEntityEndsWithApi } from './TestEntityEndsWithApi';
/**
 * This class represents the entity "A_TestEntityEndsWithCollection" of service "API_TEST_SRV".
 */
export declare class TestEntityEndsWith<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityEndsWithType<T>
{
  readonly _entityApi: TestEntityEndsWithApi<T>;
  /**
   * Technical entity name for TestEntityEndsWith.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the TestEntityEndsWith entity
   */
  static _keys: string[];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
  constructor(_entityApi: TestEntityEndsWithApi<T>);
}
export interface TestEntityEndsWithType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
//# sourceMappingURL=TestEntityEndsWith.d.ts.map
