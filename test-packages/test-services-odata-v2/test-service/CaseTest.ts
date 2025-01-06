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
import type { CaseTestApi } from './CaseTestApi';

/**
 * See https://api.sap.com/api/path for more information.
 */
export class CaseTest<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements CaseTestType<T>
{
  /**
   * Technical entity name for CaseTest.
   */
  static override _entityName = 'A_CaseTest';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the CaseTest entity.
   */
  static _keys = ['KeyPropertyString'];
  /**
   * Key Property String.
   */
  declare keyPropertyString: DeserializedType<T, 'Edm.String'>;

  constructor(_entityApi: CaseTestApi<T>) {
    super(_entityApi);
  }
}

export interface CaseTestType<T extends DeSerializers = DefaultDeSerializers> {
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
}
