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
import type { TestEntityOtherMultiLinkApi } from './TestEntityOtherMultiLinkApi';

/**
 * See https://api.sap.com/api/path for more information.
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
  static override _entityName = 'A_TestEntityOtherMultiLink';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityOtherMultiLink entity.
   */
  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  declare keyProperty: DeserializedType<T, 'Edm.String'>;

  constructor(_entityApi: TestEntityOtherMultiLinkApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntityOtherMultiLinkType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
