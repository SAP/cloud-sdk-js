/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v2';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/internal';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import { TestEntityMultiLink, TestEntityMultiLinkType } from './TestEntityMultiLink';
import { TestEntityOtherMultiLink, TestEntityOtherMultiLinkType } from './TestEntityOtherMultiLink';
import { TestEntitySingleLink, TestEntitySingleLinkType } from './TestEntitySingleLink';

/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
export class TestEntity<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntityType<T> {
  /**
   * Technical entity name for TestEntity.
   */
  static _entityName = 'A_TestEntity';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * All key fields of the TestEntity entity
   */
  static _keys = ['KeyPropertyGuid', 'KeyPropertyString'];
  /**
   * Key Property Guid.
   */
  keyPropertyGuid!: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Key Property String.
   */
  keyPropertyString!: DeserializedType<T, 'Edm.String'>;
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  /**
   * Int 32 Property.
   * @nullable
   */
  int32Property?: DeserializedType<T, 'Edm.Int32'> | null;
  /**
   * Int 64 Property.
   * @nullable
   */
  int64Property?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Decimal Property.
   * @nullable
   */
  decimalProperty?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Single Property.
   * @nullable
   */
  singleProperty?: DeserializedType<T, 'Edm.Single'> | null;
  /**
   * Double Property.
   * @nullable
   */
  doubleProperty?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Float Property.
   * @nullable
   */
  floatProperty?: DeserializedType<T, 'Edm.Float'> | null;
  /**
   * Time Property.
   * @nullable
   */
  timeProperty?: DeserializedType<T, 'Edm.Time'> | null;
  /**
   * Date Time Property.
   * @nullable
   */
  dateTimeProperty?: DeserializedType<T, 'Edm.DateTime'> | null;
  /**
   * Date Time Off Set Property.
   * @nullable
   */
  dateTimeOffSetProperty?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Byte Property.
   * @nullable
   */
  byteProperty?: DeserializedType<T, 'Edm.Byte'> | null;
  /**
   * S Byte Property.
   * @nullable
   */
  sByteProperty?: DeserializedType<T, 'Edm.SByte'> | null;
  /**
   * Something The Sdk Does Not Support.
   * @nullable
   */
  somethingTheSdkDoesNotSupport?: DeserializedType<T, 'Edm.Any'> | null;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType<T> | null;
  /**
   * One-to-many navigation property to the [[TestEntityMultiLink]] entity.
   */
  toMultiLink!: TestEntityMultiLink<T>[];
  /**
   * One-to-many navigation property to the [[TestEntityOtherMultiLink]] entity.
   */
  toOtherMultiLink!: TestEntityOtherMultiLink<T>[];
  /**
   * One-to-one navigation property to the [[TestEntitySingleLink]] entity.
   */
  toSingleLink?: TestEntitySingleLink<T> | null;
}

export interface TestEntityType<T extends DeSerializers = DefaultDeSerializers> {
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
