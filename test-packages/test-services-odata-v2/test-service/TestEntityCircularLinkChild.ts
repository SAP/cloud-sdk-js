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
} from '@sap-cloud-sdk/odata-v2';
import type { TestEntityCircularLinkChildApi } from './TestEntityCircularLinkChildApi';

/**
 * See https://api.sap.com/api/path for more information.
 */
export class TestEntityCircularLinkChild<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityCircularLinkChildType<T>
{
  /**
   * Technical entity name for TestEntityCircularLinkChild.
   */
  static override _entityName = 'A_TestEntityCircularLinkChild';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityCircularLinkChild entity.
   */
  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   */
  declare keyProperty: DeserializedType<T, 'Edm.String'>;
  /**
   * One-to-many navigation property to the {@link TestEntityCircularLinkChild} entity.
   */
  declare toParent: TestEntityCircularLinkChild<T>[];

  constructor(_entityApi: TestEntityCircularLinkChildApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntityCircularLinkChildType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
  toParent: TestEntityCircularLinkChildType<T>[];
}
