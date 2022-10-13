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
import type { TestEntityOtherMultiLinkApi } from './TestEntityOtherMultiLinkApi';

/**
 * This class represents the entity "A_TestEntityOtherMultiLink" of service "API_TEST_SRV".
 */
export class TestEntityOtherMultiLink<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityOtherMultiLinkType<T>
{
  /**
   * Technical entity name for TestEntityOtherMultiLink.
   */
  static _entityName = 'A_TestEntityOtherMultiLink';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityOtherMultiLink entity
   */
  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty!: DeserializedType<T, 'Edm.String'>;

  constructor(readonly _entityApi: TestEntityOtherMultiLinkApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntityOtherMultiLinkType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
