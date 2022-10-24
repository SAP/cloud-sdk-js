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

  boundActionWithoutArguments_2<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundActionRequestBuilder<
    TestEntityLink<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  > {
    const params = {};
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any,
      this as any,
      'TestService.boundActionWithoutArguments',
      data => data,
      params,
      deSerializers
    ) as any;
  }

  createTestEntityById_2<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundActionRequestBuilder<
    TestEntityLink<DeSerializersT>,
    DeSerializersT,
    any,
    TestEntity | null
  > {
    const params = {};
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

  createTestEntityByIdReturnId_2<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundActionRequestBuilder<
    TestEntityLink<DeSerializersT>,
    DeSerializersT,
    any,
    number | null
  > {
    const params = {};
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

  createTestEntityReturnId_2<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(): BoundActionRequestBuilder<
    TestEntityLink<DeSerializersT>,
    DeSerializersT,
    any,
    number | null
  > {
    const params = {};
    const deSerializers = defaultDeSerializers as any;
    return new BoundActionRequestBuilder(
      this._entityApi as any,
      this as any,
      'TestService.createTestEntityReturnId',
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
