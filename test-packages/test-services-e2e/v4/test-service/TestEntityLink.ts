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
import type { TestEntityLinkApi } from './TestEntityLinkApi';
import type { TestEntity } from './TestEntity';
import type { TestEntityWithMultipleKeys } from './TestEntityWithMultipleKeys';
import type { TestEntity50Prop } from './TestEntity50Prop';

/**
 * This class represents the entity "TestEntityLink" of service "TestService".
 */
export class TestEntityLink<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements TestEntityLinkType<T>
{
  /**
   * Technical entity name for TestEntityLink.
   */
  static _entityName = 'TestEntityLink';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/odata/test-service';
  /**
   * All key fields of the TestEntityLink entity
   */
  static _keys = ['KeyTestEntityLink', 'KeyToTestEntity'];
  /**
   * Key Test Entity Link.
   */
  keyTestEntityLink!: DeserializedType<T, 'Edm.Int32'>;
  /**
   * Key To Test Entity.
   */
  keyToTestEntity!: DeserializedType<T, 'Edm.Int32'>;
  /**
   * String Property.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;

  constructor(readonly _entityApi: TestEntityLinkApi<T>) {
    super(_entityApi);
  }

  concatStrings<DeSerializersT extends DeSerializers = DefaultDeSerializers>(
    str1: string,
    str2: string
  ): BoundFunctionRequestBuilder<
    TestEntityLink<DeSerializersT>,
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
    TestEntityLink<DeSerializersT>,
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
    TestEntityLink<DeSerializersT>,
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
    TestEntityLink<DeSerializersT>,
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
    TestEntityLink<DeSerializersT>,
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
    TestEntityLink<DeSerializersT>,
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
    TestEntityLink<DeSerializersT>,
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
    TestEntityLink<DeSerializersT>,
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
    TestEntityLink<DeSerializersT>,
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

export interface TestEntityLinkType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyTestEntityLink: DeserializedType<T, 'Edm.Int32'>;
  keyToTestEntity: DeserializedType<T, 'Edm.Int32'>;
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
}
