/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
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
export declare class CaseTest<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements CaseTestType<T>
{
  /**
   * Technical entity name for CaseTest.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultBasePath: string;
  /**
   * All key fields of the CaseTest entity.
   */
  static _keys: string[];
  /**
   * Key Property String.
   */
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
  constructor(_entityApi: CaseTestApi<T>);
}
export interface CaseTestType<T extends DeSerializers = DefaultDeSerializers> {
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
}
