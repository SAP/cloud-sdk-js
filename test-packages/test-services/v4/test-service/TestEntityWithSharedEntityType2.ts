/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';

/**
 * This class represents the entity "A_TestEntityWithSharedEntityType2" of service "API_TEST_SRV".
 */
export class TestEntityWithSharedEntityType2<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityWithSharedEntityType2Type<T>
{
  /**
   * Technical entity name for TestEntityWithSharedEntityType2.
   */
  static _entityName = 'A_TestEntityWithSharedEntityType2';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityWithSharedEntityType2 entity
   */
  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty!: DeserializedType<T, 'Edm.String'>;
}

export interface TestEntityWithSharedEntityType2Type<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
