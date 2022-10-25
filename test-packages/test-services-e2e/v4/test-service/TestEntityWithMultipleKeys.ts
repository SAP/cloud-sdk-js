/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType,
  entityDeserializer,
  BoundActionRequestBuilder,
  transformReturnValueForComplexType,
  defaultDeSerializers,
  BoundFunctionRequestBuilder,
  FunctionImportParameter,
  ActionImportParameter
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntityWithMultipleKeysApi } from './TestEntityWithMultipleKeysApi';
import type { TestEntity } from './TestEntity';
import type { TestEntityLink } from './TestEntityLink';
import type { TestEntity50Prop } from './TestEntity50Prop';

/**
 * This class represents the entity "TestEntityWithMultipleKeys" of service "TestService".
 */
export class TestEntityWithMultipleKeys<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntityWithMultipleKeysType<T>
{
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
  static _keys = [
    'KeyTestEntityWithMultipleKeys',
    'StringPropertyWithMultipleKeys',
    'BooleanPropertyWithMultipleKeys'
  ];
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

  concatStrings<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    str1: string,
    str2: string
  ): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  > {
    const params = {
      str1: new FunctionImportParameter('str1', 'Edm.String', str1),
      str2: new FunctionImportParameter('str2', 'Edm.String', str2)
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any,
      this as any,
      'TestService.concatStrings',
      data => data,
      params,
      deSerializers
    ) as any;
  }

  getAll<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    TestEntity | null
  > {
    const params = {};
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any,
      this as any,
      'TestService.getAll',
      data => data,
      params,
      deSerializers
    ) as any;
  }

  getByKey<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    param: number
  ): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    TestEntity | null
  > {
    const params = {
      param: new FunctionImportParameter('param', 'Edm.Int32', param)
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any,
      this as any,
      'TestService.getByKey',
      data => data,
      params,
      deSerializers
    ) as any;
  }

  getByKeyWithMultipleKeys<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    keyTestEntityWithMultipleKeys: number,
    stringPropertyWithMultipleKeys: string,
    booleanPropertyWithMultipleKeys: boolean
  ): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    TestEntityWithMultipleKeys | null
  > {
    const params = {
      keyTestEntityWithMultipleKeys: new FunctionImportParameter(
        'keyTestEntityWithMultipleKeys',
        'Edm.Int32',
        keyTestEntityWithMultipleKeys
      ),
      stringPropertyWithMultipleKeys: new FunctionImportParameter(
        'stringPropertyWithMultipleKeys',
        'Edm.String',
        stringPropertyWithMultipleKeys
      ),
      booleanPropertyWithMultipleKeys: new FunctionImportParameter(
        'booleanPropertyWithMultipleKeys',
        'Edm.Boolean',
        booleanPropertyWithMultipleKeys
      )
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any,
      this as any,
      'TestService.getByKeyWithMultipleKeys',
      data => data,
      params,
      deSerializers
    ) as any;
  }

  returnCollection<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    param: number
  ): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    number | null
  > {
    const params = {
      param: new FunctionImportParameter('param', 'Edm.Int32', param)
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any,
      this as any,
      'TestService.returnCollection',
      data => data,
      params,
      deSerializers
    ) as any;
  }

  returnInt<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    param: number
  ): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    number | null
  > {
    const params = {
      param: new FunctionImportParameter('param', 'Edm.Int32', param)
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any,
      this as any,
      'TestService.returnInt',
      data => data,
      params,
      deSerializers
    ) as any;
  }

  returnSapCloudSdk<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  > {
    const params = {};
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any,
      this as any,
      'TestService.returnSapCloudSdk',
      data => data,
      params,
      deSerializers
    ) as any;
  }

  createTestEntityById<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    id: number
  ): BoundActionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    TestEntity | null
  > {
    const params = {
      id: new ActionImportParameter('id', 'Edm.Int32', id)
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any,
      this as any,
      'TestService.createTestEntityById',
      data => data,
      params,
      deSerializers
    ) as any;
  }

  createTestEntityByIdReturnId<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    id: number
  ): BoundActionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    number | null
  > {
    const params = {
      id: new ActionImportParameter('id', 'Edm.Int32', id)
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any,
      this as any,
      'TestService.createTestEntityByIdReturnId',
      data => data,
      params,
      deSerializers
    ) as any;
  }
}

export interface TestEntityWithMultipleKeysType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyTestEntityWithMultipleKeys: DeserializedType<T, 'Edm.Int32'>;
  stringPropertyWithMultipleKeys: DeserializedType<T, 'Edm.String'>;
  booleanPropertyWithMultipleKeys: DeserializedType<T, 'Edm.Boolean'>;
}
