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
import type { TestEntityLvl3MultiLinkApi } from './TestEntityLvl3MultiLinkApi';

/**
 * This class represents the entity "A_TestEntityLvl3MultiLink" of service "API_TEST_SRV".
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
  static _entityName = 'A_TestEntityLvl3MultiLink';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntityLvl3MultiLink entity
   */
  static _keys = ['KeyProperty'];
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty!: DeserializedType<T, 'Edm.String'>;

  constructor(readonly _entityApi: TestEntityLvl3MultiLinkApi<T>) {
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
