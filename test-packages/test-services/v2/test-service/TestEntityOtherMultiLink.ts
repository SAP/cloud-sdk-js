/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v2';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';

/**
 * This class represents the entity "A_TestEntityOtherMultiLink" of service "API_TEST_SRV".
 */
export class TestEntityOtherMultiLink<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntityOtherMultiLinkType<T> {
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
   */
  keyProperty!: DeserializedType<T, 'Edm.String'>;
}

export interface TestEntityOtherMultiLinkType<T extends DeSerializers = DefaultDeSerializers> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
