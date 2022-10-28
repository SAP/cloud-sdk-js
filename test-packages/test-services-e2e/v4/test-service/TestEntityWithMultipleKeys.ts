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
  ActionImportRequestBuilder,
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

  /**
   * Bound Function Without Arguments With Multiple Keys.
   * @param parameters - Object containing all parameters for the function.
   * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
   */
  boundFunctionWithoutArgumentsWithMultipleKeys<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    parameters: BoundFunctionWithoutArgumentsWithMultipleKeysParameters<DeSerializersT>,
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ): FunctionImportRequestBuilder<
    DeSerializersT,
    BoundFunctionWithoutArgumentsWithMultipleKeysParameters<DeSerializersT>,
    string | null
  > {
    const params = {};

    return new FunctionImportRequestBuilder(
      '/odata/test-service',
      'boundFunctionWithoutArgumentsWithMultipleKeys',
      data =>
        transformReturnValueForEdmType(data, val =>
          edmToTs(val.value, 'Edm.String', deSerializers)
        ),
      params,
      deSerializers
    );
  }

  /**
   * Bound Function With Arguments With Multiple Keys.
   * @param parameters - Object containing all parameters for the function.
   * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
   */
  boundFunctionWithArgumentsWithMultipleKeys<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    parameters: BoundFunctionWithArgumentsWithMultipleKeysParameters<DeSerializersT>,
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ): FunctionImportRequestBuilder<
    DeSerializersT,
    BoundFunctionWithArgumentsWithMultipleKeysParameters<DeSerializersT>,
    string | null
  > {
    const params = {
      param1: new FunctionImportParameter(
        'param1',
        'Edm.String',
        parameters.param1
      ),
      param2: new FunctionImportParameter(
        'param2',
        'Edm.String',
        parameters.param2
      )
    };

    return new FunctionImportRequestBuilder(
      '/odata/test-service',
      'boundFunctionWithArgumentsWithMultipleKeys',
      data =>
        transformReturnValueForEdmType(data, val =>
          edmToTs(val.value, 'Edm.String', deSerializers)
        ),
      params,
      deSerializers
    );
  }

  /**
   * Bound Action Without Arguments With Multiple Keys.
   * @param parameters - Object containing all parameters for the action.
   * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
   */
  boundActionWithoutArgumentsWithMultipleKeys<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    parameters: BoundActionWithoutArgumentsWithMultipleKeysParameters<DeSerializersT>,
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ): ActionImportRequestBuilder<
    DeSerializersT,
    BoundActionWithoutArgumentsWithMultipleKeysParameters<DeSerializersT>,
    string | null
  > {
    const params = {};

    return new ActionImportRequestBuilder(
      '/odata/test-service',
      'boundActionWithoutArgumentsWithMultipleKeys',
      data =>
        transformReturnValueForEdmType(data, val =>
          edmToTs(val.value, 'Edm.String', deSerializers)
        ),
      params,
      deSerializers
    );
  }
}

export interface TestEntityWithMultipleKeysType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyTestEntityWithMultipleKeys: DeserializedType<T, 'Edm.Int32'>;
  stringPropertyWithMultipleKeys: DeserializedType<T, 'Edm.String'>;
  booleanPropertyWithMultipleKeys: DeserializedType<T, 'Edm.Boolean'>;
}

/**
 * Type of the parameters to be passed to {@link boundFunctionWithoutArgumentsWithMultipleKeys}.
 */
export interface BoundFunctionWithoutArgumentsWithMultipleKeysParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Type of the parameters to be passed to {@link boundFunctionWithArgumentsWithMultipleKeys}.
 */
export interface BoundFunctionWithArgumentsWithMultipleKeysParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Param 1.
   */
  param1?: string | null;
  /**
   * Param 2.
   */
  param2?: string | null;
}

/**
 * Type of the parameters to be passed to {@link boundActionWithoutArgumentsWithMultipleKeys}.
 */
export interface BoundActionWithoutArgumentsWithMultipleKeysParameters<
  DeSerializersT extends DeSerializers
> {}
