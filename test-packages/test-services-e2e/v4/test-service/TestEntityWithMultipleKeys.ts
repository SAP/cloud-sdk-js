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
  ActionImportParameter,
  edmToTs,
  transformReturnValueForEdmType,
  FunctionImportRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntityWithMultipleKeysApi } from './TestEntityWithMultipleKeysApi';
import { testService } from './service';

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

  boundFunctionWithoutArgumentsWithMultipleKeys<
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
      'TestService.boundFunctionWithoutArgumentsWithMultipleKeys',
      data => data,
      params,
      deSerializers
    ) as any;
  }

  boundFunctionWithArgumentsWithMultipleKeys<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    param1: string,
    param2: string
  ): BoundFunctionRequestBuilder<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    any,
    string | null
  > {
    const params = {
      param1: new FunctionImportParameter('param1', 'Edm.String', param1),
      param2: new FunctionImportParameter('param2', 'Edm.String', param2)
    };
    const deSerializers = defaultDeSerializers as any;
    return new BoundFunctionRequestBuilder(
      this._entityApi as any,
      this as any,
      'TestService.boundFunctionWithArgumentsWithMultipleKeys',
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
