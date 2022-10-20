/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType, entityDeserializer, BoundActionRequestBuilder, transformReturnValueForComplexType, defaultDeSerializers, BoundFunctionRequestBuilder, FunctionImportParameter, ActionImportParameter } from '@sap-cloud-sdk/odata-v4';
import type { TestEntityApi } from './TestEntityApi';
import { TestEntityLink, TestEntityLinkType } from './TestEntityLink';

/**
 * This class represents the entity "TestEntity" of service "TestService".
 */
export class TestEntity<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntityType<T> {
  /**
   * Technical entity name for TestEntity.
   */
  static _entityName = 'TestEntity';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/odata/test-service';
  /**
   * All key fields of the TestEntity entity
   */
  static _keys = ['KeyTestEntity'];
  /**
   * Key Test Entity.
   */
  keyTestEntity!: DeserializedType<T, 'Edm.Int32'>;
  /**
   * String Property.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property.
   * @nullable
   */
  int64Property?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property.
   * @nullable
   */
  doubleProperty?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property.
   * @nullable
   */
  decimalProperty?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property.
   * @nullable
   */
  dateProperty?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property.
   * @nullable
   */
  timeOfDayProperty?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Data Time Offset Timestamp Property.
   * @nullable
   */
  dataTimeOffsetTimestampProperty?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * One-to-many navigation property to the {@link TestEntityLink} entity.
   */
  toMultiLink!: TestEntityLink<T>[];

  constructor(readonly _entityApi: TestEntityApi<T>) {
    super(_entityApi);
  }

  boundFunctionWithoutArguments<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT, any, string | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.boundFunctionWithoutArguments', (data) => data, params, deSerializers
    ) as any;
  }

  returnKey<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT, any, number | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.returnKey', (data) => data, params, deSerializers
    ) as any;
  }

  boundActionWithoutArguments<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT, any, string | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.boundActionWithoutArguments', (data) => data, params, deSerializers
    ) as any;
  }

  createTestEntityById<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT, any, TestEntity | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.createTestEntityById', (data) => data, params, deSerializers
    ) as any;
  }

  createTestEntityByIdReturnId<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT, any, number | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.createTestEntityByIdReturnId', (data) => data, params, deSerializers
    ) as any;
  }

  createTestEntityReturnId<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntity<DeSerializersT>, DeSerializersT, any, number | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.createTestEntityReturnId', (data) => data, params, deSerializers
    ) as any;
  }
}

export interface TestEntityType<T extends DeSerializers = DefaultDeSerializers> {
  keyTestEntity: DeserializedType<T, 'Edm.Int32'>;
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  dataTimeOffsetTimestampProperty?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  toMultiLink: TestEntityLinkType<T>[];
}
