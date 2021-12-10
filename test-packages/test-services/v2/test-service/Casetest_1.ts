/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v2';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';

/**
 * This class represents the entity "A_CASETEST" of service "API_TEST_SRV".
 */
export class Casetest_1<T extends DeSerializers = DefaultDeSerializers> extends Entity implements Casetest_1Type<T> {
  /**
   * Technical entity name for Casetest_1.
   */
  static _entityName = 'A_CASETEST';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the Casetest_1 entity
   */
  static _keys = ['KeyPropertyString'];
  /**
   * Key Property String.
   */
  keyPropertyString!: DeserializedType<T, 'Edm.String'>;
}

export interface Casetest_1Type<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
  keyPropertyString: DeserializedType<DeSerializersT, 'Edm.String'>;
}
