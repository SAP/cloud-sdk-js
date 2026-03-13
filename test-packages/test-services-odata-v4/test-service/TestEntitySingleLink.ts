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
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntitySingleLinkApi } from './TestEntitySingleLinkApi';
import {
  TestEntityLvl2MultiLink,
  TestEntityLvl2MultiLinkType
} from './TestEntityLvl2MultiLink';
import {
  TestEntityLvl2SingleLink,
  TestEntityLvl2SingleLinkType
} from './TestEntityLvl2SingleLink';

/**
 * See https://api.sap.com/api/path for more information.
 */
export class TestEntitySingleLink<
  T extends DeSerializers = DefaultDeSerializers
>
  extends Entity
  implements TestEntitySingleLinkType<T>
{
  /**
   * Technical entity name for TestEntitySingleLink.
   */
  static override _entityName = 'A_TestEntitySingleLink';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntitySingleLink entity.
   */
  static _keys = ['KeyProperty'];
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
  /**
   * Key Property.
   * Maximum length: 10.
   */
  declare keyProperty: DeserializedType<T, 'Edm.String'>;
  /**
   * One-to-many navigation property to the {@link TestEntityLvl2MultiLink} entity.
   */
  declare toMultiLink: TestEntityLvl2MultiLink<T>[];
  /**
   * One-to-one navigation property to the {@link TestEntityLvl2SingleLink} entity.
   */
  declare toSingleLink?: TestEntityLvl2SingleLink<T> | null;

  constructor(_entityApi: TestEntitySingleLinkApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntitySingleLinkType<
  T extends DeSerializers = DefaultDeSerializers
> {
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  keyProperty: DeserializedType<T, 'Edm.String'>;
  toMultiLink: TestEntityLvl2MultiLinkType<T>[];
  toSingleLink?: TestEntityLvl2SingleLinkType<T> | null;
}
