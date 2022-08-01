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

/**
 * This class represents the entity "A_CaseTest" of service "API_TEST_SRV".
 */
export class CaseTest<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements CaseTestType<T>
{
  /**
   * Technical entity name for CaseTest.
   */
  static _entityName = 'A_CaseTest';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the CaseTest entity
   */
  static _keys = ['KeyPropertyString'];
  /**
   * Key Property String.
   */
  keyPropertyString!: DeserializedType<T, 'Edm.String'>;
}

export interface CaseTestType<T extends DeSerializers = DefaultDeSerializers> {
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
}
