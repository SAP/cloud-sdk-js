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
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import type { TestEntityApi } from './TestEntityApi';
import {
  TestEntityMultiLink,
  TestEntityMultiLinkType
} from './TestEntityMultiLink';
import {
  TestEntityOtherMultiLink,
  TestEntityOtherMultiLinkType
} from './TestEntityOtherMultiLink';
import {
  TestEntitySingleLink,
  TestEntitySingleLinkType
} from './TestEntitySingleLink';

/**
 * See https://api.sap.com/api/path for more information.
 */
export class TestEntity<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements TestEntityType<T>
{
  /**
   * Technical entity name for TestEntity.
   */
  static override _entityName = 'A_TestEntity';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntity entity.
   */
  static _keys = ['KeyPropertyGuid', 'KeyPropertyString'];
  /**
   * Key Property Guid.
   */
  declare keyPropertyGuid: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Key Property String.
   */
  declare keyPropertyString: DeserializedType<T, 'Edm.String'>;
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
   * Int 32 Property.
   * @nullable
   */
  declare int32Property?: DeserializedType<T, 'Edm.Int32'> | null;
  /**
   * Int 64 Property.
   * @nullable
   */
  declare int64Property?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Decimal Property.
   * @nullable
   */
  declare decimalProperty?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Single Property.
   * @nullable
   */
  declare singleProperty?: DeserializedType<T, 'Edm.Single'> | null;
  /**
   * Double Property.
   * @nullable
   */
  declare doubleProperty?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Float Property.
   * @nullable
   */
  declare floatProperty?: DeserializedType<T, 'Edm.Float'> | null;
  /**
   * Time Property.
   * @nullable
   */
  declare timeProperty?: DeserializedType<T, 'Edm.Time'> | null;
  /**
   * Date Time Property.
   * @nullable
   */
  declare dateTimeProperty?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Date Time Off Set Property.
   * @nullable
   */
  declare dateTimeOffSetProperty?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Byte Property.
   * @nullable
   */
  declare byteProperty?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * S Byte Property.
   * @nullable
   */
  declare sByteProperty?: DeserializedType<T, 'Edm.SByte'> | null;
  /**
   * Something The Sdk Does Not Support.
   * @nullable
   */
  declare somethingTheSdkDoesNotSupport?: DeserializedType<T, 'Edm.Any'> | null;
  /**
   * Complex Type Property.
   * @nullable
   */
  declare complexTypeProperty?: TestComplexType<T> | null;
  /**
   * One-to-many navigation property to the {@link TestEntityMultiLink} entity.
   */
  declare toMultiLink: TestEntityMultiLink<T>[];
  /**
   * One-to-many navigation property to the {@link TestEntityOtherMultiLink} entity.
   */
  declare toOtherMultiLink: TestEntityOtherMultiLink<T>[];
  /**
   * One-to-one navigation property to the {@link TestEntitySingleLink} entity.
   */
  declare toSingleLink?: TestEntitySingleLink<T> | null;

  constructor(_entityApi: TestEntityApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntityType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyPropertyGuid: DeserializedType<T, 'Edm.Guid'>;
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  int32Property?: DeserializedType<T, 'Edm.Int32'> | null;
  int64Property?: DeserializedType<T, 'Edm.Int64'> | null;
  decimalProperty?: DeserializedType<T, 'Edm.Decimal'> | null;
  singleProperty?: DeserializedType<T, 'Edm.Single'> | null;
  doubleProperty?: DeserializedType<T, 'Edm.Double'> | null;
  floatProperty?: DeserializedType<T, 'Edm.Float'> | null;
  timeProperty?: DeserializedType<T, 'Edm.Time'> | null;
  dateTimeProperty?: DeserializedType<T, 'Edm.DateTime'> | null;
  dateTimeOffSetProperty?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  byteProperty?: DeserializedType<T, 'Edm.Byte'> | null;
  sByteProperty?: DeserializedType<T, 'Edm.SByte'> | null;
  somethingTheSdkDoesNotSupport?: DeserializedType<T, 'Edm.Any'> | null;
  complexTypeProperty?: TestComplexType<T> | null;
  toMultiLink: TestEntityMultiLinkType<T>[];
  toOtherMultiLink: TestEntityOtherMultiLinkType<T>[];
  toSingleLink?: TestEntitySingleLinkType<T> | null;
}
