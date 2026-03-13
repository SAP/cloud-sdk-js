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
import type { TestEntityLvl2MultiLinkApi } from './TestEntityLvl2MultiLinkApi';

/**
 * See https://api.sap.com/api/path for more information.
 */
export class TestEntityLvl2MultiLink<
  T extends DeSerializers = DefaultDeSerializers
>
  extends Entity
  implements TestEntityLvl2MultiLinkType<T>
{
  /**
   * Technical entity name for TestEntityLvl2MultiLink.
   */
  static override _entityName = 'A_TestEntityLvl2MultiLink';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityLvl2MultiLink entity.
   */
  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  declare keyProperty: DeserializedType<T, 'Edm.String'>;
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  declare stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Boolean Property.
   * @nullable
   */
  declare booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Guid Property.
   * @nullable
   */
  declare guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Int 16 Property.
   * @nullable
   */
  declare int16Property?: DeserializedType<T, 'Edm.Int16'> | null;

  constructor(_entityApi: TestEntityLvl2MultiLinkApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntityLvl2MultiLinkType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
}
