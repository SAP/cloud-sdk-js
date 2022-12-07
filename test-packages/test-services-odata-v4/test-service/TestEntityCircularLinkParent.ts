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
import type { TestEntityCircularLinkParentApi } from './TestEntityCircularLinkParentApi';
import {
  TestEntityCircularLinkChild,
  TestEntityCircularLinkChildType
} from './TestEntityCircularLinkChild';

/**
 * This class represents the entity "A_TestEntityCircularLinkParent" of service "API_TEST_SRV".
 */
export class TestEntityCircularLinkParent<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityCircularLinkParentType<T>
{
  /**
   * Technical entity name for TestEntityCircularLinkParent.
   */
  static _entityName = 'A_TestEntityCircularLinkParent';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityCircularLinkParent entity
   */
  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty!: DeserializedType<T, 'Edm.String'>;
  /**
   * One-to-one navigation property to the {@link TestEntityCircularLinkChild} entity.
   */
  toFirstChild?: TestEntityCircularLinkChild<T> | null;
  /**
   * One-to-many navigation property to the {@link TestEntityCircularLinkChild} entity.
   */
  toChildren!: TestEntityCircularLinkChild<T>[];

  constructor(readonly _entityApi: TestEntityCircularLinkParentApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntityCircularLinkParentType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
  toFirstChild?: TestEntityCircularLinkChildType<T> | null;
  toChildren: TestEntityCircularLinkChildType<T>[];
}
