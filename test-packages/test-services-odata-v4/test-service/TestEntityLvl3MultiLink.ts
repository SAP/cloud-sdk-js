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
import type { TestEntityLvl3MultiLinkApi } from './TestEntityLvl3MultiLinkApi';

/**
 * See https://api.sap.com/api/path for more information.
 */
export class TestEntityLvl3MultiLink<
  T extends DeSerializers = DefaultDeSerializers
>
  extends Entity
  implements TestEntityLvl3MultiLinkType<T>
{
  /**
   * Technical entity name for TestEntityLvl3MultiLink.
   */
  static override _entityName = 'A_TestEntityLvl3MultiLink';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityLvl3MultiLink entity.
   */
  static _keys = ['KeyProperty'];
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  declare stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property.
   * @nullable
   */
  declare guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Key Property.
   * Maximum length: 10.
   */
  declare keyProperty: DeserializedType<T, 'Edm.String'>;

  constructor(_entityApi: TestEntityLvl3MultiLinkApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntityLvl3MultiLinkType<
  T extends DeSerializers = DefaultDeSerializers
> {
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  keyProperty: DeserializedType<T, 'Edm.String'>;
}
