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
import type { TestEntityWithSharedEntityType2Api } from './TestEntityWithSharedEntityType2Api';
/**
 * This class represents the entity "A_TestEntityWithSharedEntityType2" of service "API_TEST_SRV".
 */
export declare class TestEntityWithSharedEntityType2<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityWithSharedEntityType2Type<T>
{
  readonly _entityApi: TestEntityWithSharedEntityType2Api<T>;
  /**
   * Technical entity name for TestEntityWithSharedEntityType2.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the TestEntityWithSharedEntityType2 entity
   */
  static _keys: string[];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: DeserializedType<T, 'Edm.String'>;
  constructor(_entityApi: TestEntityWithSharedEntityType2Api<T>);
}
export interface TestEntityWithSharedEntityType2Type<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
//# sourceMappingURL=TestEntityWithSharedEntityType2.d.ts.map
