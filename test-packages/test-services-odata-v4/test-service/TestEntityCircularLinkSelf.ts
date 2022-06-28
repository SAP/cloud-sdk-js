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

/**
 * This class represents the entity "A_TestEntityCircularLinkSelf" of service "API_TEST_SRV".
 */
export class TestEntityCircularLinkSelf<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityCircularLinkSelfType<T>
{
  /**
   * Technical entity name for TestEntityCircularLinkSelf.
   */
  static _entityName = 'A_TestEntityCircularLinkSelf';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityCircularLinkSelf entity
   */
  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty!: DeserializedType<T, 'Edm.String'>;
  /**
   * One-to-one navigation property to the [[TestEntityCircularLinkSelf]] entity.
   */
  toSelf?: TestEntityCircularLinkSelf<T> | null;
}

export interface TestEntityCircularLinkSelfType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
  toSelf?: TestEntityCircularLinkSelfType<T> | null;
}
