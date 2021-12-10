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
  stringProperty?: DeserializedType<T, 'Edm.String'>;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: DeserializedType<T, 'Edm.Int16'>;
  /**
   * Int 32 Property.
   * @nullable
   */
  int32Property?: DeserializedType<T, 'Edm.Int32'>;
  /**
   * Int 64 Property.
   * @nullable
   */
  int64Property?: DeserializedType<T, 'Edm.Int64'>;
  /**
   * Decimal Property.
   * @nullable
   */
  decimalProperty?: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Single Property.
   * @nullable
   */
  singleProperty?: DeserializedType<T, 'Edm.Single'>;
  /**
   * Double Property.
   * @nullable
   */
  doubleProperty?: DeserializedType<T, 'Edm.Double'>;
  /**
   * Float Property.
   * @nullable
   */
  floatProperty?: DeserializedType<T, 'Edm.Float'>;
  /**
   * Time Property.
   * @nullable
   */
  timeProperty?: DeserializedType<T, 'Edm.Time'>;
  /**
   * Date Time Property.
   * @nullable
   */
  dateTimeProperty?: DeserializedType<T, 'Edm.DateTime'>;
  /**
   * Date Time Off Set Property.
   * @nullable
   */
  dateTimeOffSetProperty?: DeserializedType<T, 'Edm.DateTimeOffset'>;
  /**
   * Byte Property.
   * @nullable
   */
  byteProperty?: DeserializedType<T, 'Edm.Byte'>;
  /**
   * S Byte Property.
   * @nullable
   */
  sByteProperty?: DeserializedType<T, 'Edm.SByte'>;
  /**
   * Something The Sdk Does Not Support.
   * @nullable
   */
  somethingTheSdkDoesNotSupport?: DeserializedType<T, 'Edm.Any'>;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType<T>;
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

export interface TestEntityType<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
  keyPropertyGuid: DeserializedType<DeSerializersT, 'Edm.Guid'>;
  keyPropertyString: DeserializedType<DeSerializersT, 'Edm.String'>;
  stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'> | null;
  booleanProperty?: DeserializedType<DeSerializersT, 'Edm.Boolean'> | null;
  guidProperty?: DeserializedType<DeSerializersT, 'Edm.Guid'> | null;
  int16Property?: DeserializedType<DeSerializersT, 'Edm.Int16'> | null;
  int32Property?: DeserializedType<DeSerializersT, 'Edm.Int32'> | null;
  int64Property?: DeserializedType<DeSerializersT, 'Edm.Int64'> | null;
  decimalProperty?: DeserializedType<DeSerializersT, 'Edm.Decimal'> | null;
  singleProperty?: DeserializedType<DeSerializersT, 'Edm.Single'> | null;
  doubleProperty?: DeserializedType<DeSerializersT, 'Edm.Double'> | null;
  floatProperty?: DeserializedType<DeSerializersT, 'Edm.Float'> | null;
  timeProperty?: DeserializedType<DeSerializersT, 'Edm.Time'> | null;
  dateTimeProperty?: DeserializedType<DeSerializersT, 'Edm.DateTime'> | null;
  dateTimeOffSetProperty?: DeserializedType<DeSerializersT, 'Edm.DateTimeOffset'> | null;
  byteProperty?: DeserializedType<DeSerializersT, 'Edm.Byte'> | null;
  sByteProperty?: DeserializedType<DeSerializersT, 'Edm.SByte'> | null;
  somethingTheSdkDoesNotSupport?: DeserializedType<DeSerializersT, 'Edm.Any'> | null;
  complexTypeProperty?: TestComplexType<DeSerializersT> | null;
  toMultiLink: TestEntityMultiLinkType<DeSerializersT>[];
  toOtherMultiLink: TestEntityOtherMultiLinkType<DeSerializersT>[];
  toSingleLink?: TestEntitySingleLinkType<DeSerializersT> | null;
}
