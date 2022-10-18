/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType, entityDeserializer, BoundActionRequestBuilder, transformReturnValueForComplexType, defaultDeSerializers, BoundFunctionRequestBuilder, FunctionImportParameter, ActionImportParameter } from '@sap-cloud-sdk/odata-v4';
import type { TestEntityWithMultipleKeysApi } from './TestEntityWithMultipleKeysApi';
import type { TestEntityWithMultipleKeys } from './TestEntityWithMultipleKeys';
import type { TestEntity } from './TestEntity';

/**
 * This class represents the entity "TestEntityWithMultipleKeys" of service "TestService".
 */
export class TestEntityWithMultipleKeys<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntityWithMultipleKeysType<T> {
  /**
   * Technical entity name for TestEntityWithMultipleKeys.
   */
  static _entityName = 'TestEntityWithMultipleKeys';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/odata/test-service';
  /**
   * All key fields of the TestEntityWithMultipleKeys entity
   */
  static _keys = ['KeyTestEntityWithMultipleKeys', 'StringPropertyWithMultipleKeys', 'BooleanPropertyWithMultipleKeys'];
  /**
   * Key Test Entity With Multiple Keys.
   */
  keyTestEntityWithMultipleKeys!: DeserializedType<T, 'Edm.Int32'>;
  /**
   * String Property With Multiple Keys.
   * Maximum length: 111.
   */
  stringPropertyWithMultipleKeys!: DeserializedType<T, 'Edm.String'>;
  /**
   * Boolean Property With Multiple Keys.
   */
  booleanPropertyWithMultipleKeys!: DeserializedType<T, 'Edm.Boolean'>;

  constructor(readonly _entityApi: TestEntityWithMultipleKeysApi<T>) {
    super(_entityApi);
  }

  boundFunctionWithoutArguments<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, string | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.boundFunctionWithoutArguments', (data) => data, params, deSerializers
    ) as any;
  }

  boundFunctionWithoutArgumentsWithMultipleKeys<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, string | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.boundFunctionWithoutArgumentsWithMultipleKeys', (data) => data, params, deSerializers
    ) as any;
  }

  boundFunctionWithArgumentsWithMultipleKeys<DeSerializersT extends DeSerializers = DefaultDeSerializers>(param1: string, param2: string): BoundFunctionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, string | null> {
    const params = {
      param1: new FunctionImportParameter('param1', 'Edm.String', param1),
      param2: new FunctionImportParameter('param2', 'Edm.String', param2),
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.boundFunctionWithArgumentsWithMultipleKeys', (data) => data, params, deSerializers
    ) as any;
  }

  getStringProperty<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, string | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.getStringProperty', (data) => data, params, deSerializers
    ) as any;
  }

  concatStrings<DeSerializersT extends DeSerializers = DefaultDeSerializers>(Str2: string): BoundFunctionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, string | null> {
    const params = {
      Str2: new FunctionImportParameter('Str2', 'Edm.String', Str2),
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.concatStrings', (data) => data, params, deSerializers
    ) as any;
  }

  getAll<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, TestEntity[] | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.getAll', (data) => data, params, deSerializers
    ) as any;
  }

  getByKey<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, TestEntity | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.getByKey', (data) => data, params, deSerializers
    ) as any;
  }

  getByKeyWithMultipleKeys<DeSerializersT extends DeSerializers = DefaultDeSerializers>(StringPropertyWithMultipleKeys: string, BooleanPropertyWithMultipleKeys: boolean): BoundFunctionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, TestEntityWithMultipleKeys | null> {
    const params = {
      StringPropertyWithMultipleKeys: new FunctionImportParameter('StringPropertyWithMultipleKeys', 'Edm.String', StringPropertyWithMultipleKeys),
      BooleanPropertyWithMultipleKeys: new FunctionImportParameter('BooleanPropertyWithMultipleKeys', 'Edm.Boolean', BooleanPropertyWithMultipleKeys),
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.getByKeyWithMultipleKeys', (data) => data, params, deSerializers
    ) as any;
  }

  returnCollection<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, number[] | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.returnCollection', (data) => data, params, deSerializers
    ) as any;
  }

  returnInt<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, number | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.returnInt', (data) => data, params, deSerializers
    ) as any;
  }

  returnKey<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, number | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.returnKey', (data) => data, params, deSerializers
    ) as any;
  }

  returnSapCloudSdk<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundFunctionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, string | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.returnSapCloudSdk', (data) => data, params, deSerializers
    ) as any;
  }

  boundActionWithoutArguments<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, string | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.boundActionWithoutArguments', (data) => data, params, deSerializers
    ) as any;
  }

  boundActionWithoutArgumentsWithMultipleKeys<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, string | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.boundActionWithoutArgumentsWithMultipleKeys', (data) => data, params, deSerializers
    ) as any;
  }

  deleteEntity<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, number | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.deleteEntity', (data) => data, params, deSerializers
    ) as any;
  }

  createTestEntityById<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, TestEntity | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.createTestEntityById', (data) => data, params, deSerializers
    ) as any;
  }

  createTestEntityByIdReturnId<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, number | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.createTestEntityByIdReturnId', (data) => data, params, deSerializers
    ) as any;
  }

  createTestEntityReturnId<DeSerializersT extends DeSerializers = DefaultDeSerializers>(): BoundActionRequestBuilder<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, any, number | null> {
    const params = {
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any, this as any, 'TestService.createTestEntityReturnId', (data) => data, params, deSerializers
    ) as any;
  }
}

export interface TestEntityWithMultipleKeysType<T extends DeSerializers = DefaultDeSerializers> {
  keyTestEntityWithMultipleKeys: DeserializedType<T, 'Edm.Int32'>;
  stringPropertyWithMultipleKeys: DeserializedType<T, 'Edm.String'>;
  booleanPropertyWithMultipleKeys: DeserializedType<T, 'Edm.Boolean'>;
}
