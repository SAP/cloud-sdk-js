/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType,
  edmToTs,
  transformReturnValueForEdmType,
  defaultDeSerializers,
  OperationParameter,
  BoundOperationRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntityWithMultipleKeysApi } from './TestEntityWithMultipleKeysApi';

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
  static override _entityName = 'TestEntityWithMultipleKeys';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/odata/test-service';
  /**
   * All key fields of the TestEntityWithMultipleKeys entity.
   */
  static _keys = [
    'KeyTestEntityWithMultipleKeys',
    'StringPropertyWithMultipleKeys',
    'BooleanPropertyWithMultipleKeys'
  ];
  /**
   * Key Test Entity With Multiple Keys.
   */
  declare keyTestEntityWithMultipleKeys: DeserializedType<T, 'Edm.Int32'>;
  /**
   * String Property With Multiple Keys.
   * Maximum length: 111.
   */
  declare stringPropertyWithMultipleKeys: DeserializedType<T, 'Edm.String'>;
  /**
   * Boolean Property With Multiple Keys.
   */
  declare booleanPropertyWithMultipleKeys: DeserializedType<T, 'Edm.Boolean'>;

  constructor(_entityApi: TestEntityWithMultipleKeysApi<T>) {
    super(_entityApi);
  }

  /**
   * Bound Function Without Arguments With Multiple Keys.
   * @param parameters - Object containing all parameters for the function.
   * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
   */
  boundFunctionWithoutArgumentsWithMultipleKeys(
    parameters: BoundFunctionWithoutArgumentsWithMultipleKeysParameters<T>,
    deSerializers: T = defaultDeSerializers as T
  ): BoundOperationRequestBuilder<
    TestEntityWithMultipleKeys<T>,
    T,
    BoundFunctionWithoutArgumentsWithMultipleKeysParameters<T>,
    string | null
  > {
    const params = {};

    return new BoundOperationRequestBuilder(
      this._entityApi,
      this,
      'boundFunctionWithoutArgumentsWithMultipleKeys',
      data =>
        transformReturnValueForEdmType(data, val =>
          edmToTs(val.value, 'Edm.String', deSerializers)
        ),
      params,
      deSerializers,
      'function'
    );
  }

  /**
   * Bound Function With Arguments With Multiple Keys.
   * @param parameters - Object containing all parameters for the function.
   * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
   */
  boundFunctionWithArgumentsWithMultipleKeys(
    parameters: BoundFunctionWithArgumentsWithMultipleKeysParameters<T>,
    deSerializers: T = defaultDeSerializers as T
  ): BoundOperationRequestBuilder<
    TestEntityWithMultipleKeys<T>,
    T,
    BoundFunctionWithArgumentsWithMultipleKeysParameters<T>,
    string | null
  > {
    const params = {
      param1: new OperationParameter('param1', 'Edm.String', parameters.param1),
      param2: new OperationParameter('param2', 'Edm.String', parameters.param2)
    };

    return new BoundOperationRequestBuilder(
      this._entityApi,
      this,
      'boundFunctionWithArgumentsWithMultipleKeys',
      data =>
        transformReturnValueForEdmType(data, val =>
          edmToTs(val.value, 'Edm.String', deSerializers)
        ),
      params,
      deSerializers,
      'function'
    );
  }

  /**
   * Bound Action Without Arguments With Multiple Keys.
   * @param parameters - Object containing all parameters for the action.
   * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
   */
  boundActionWithoutArgumentsWithMultipleKeys(
    parameters: BoundActionWithoutArgumentsWithMultipleKeysParameters<T>,
    deSerializers: T = defaultDeSerializers as T
  ): BoundOperationRequestBuilder<
    TestEntityWithMultipleKeys<T>,
    T,
    BoundActionWithoutArgumentsWithMultipleKeysParameters<T>,
    string | null
  > {
    const params = {};

    return new BoundOperationRequestBuilder(
      this._entityApi,
      this,
      'boundActionWithoutArgumentsWithMultipleKeys',
      data =>
        transformReturnValueForEdmType(data, val =>
          edmToTs(val.value, 'Edm.String', deSerializers)
        ),
      params,
      deSerializers,
      'action'
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
