/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type {
  SimpleTestEntity,
  ComplexTestEntity,
  SimpleTestEntityWITHSymbols,
  Schema123456
} from './schema';
/**
 * Representation of the 'TestCaseApi'.
 * This API is part of the 'test-service' service.
 */
export const TestCaseApi = {
  /**
   * Create a request builder for execution of get requests to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint.
   * @param requiredPathItemPathParam Path parameter.
   * @param body -  Request body.
   * @param queryParameters -  Object containing the following keys: requiredPathItemQueryParam, optionalQueryParam, requiredQueryParam, optionalPathItemQueryParam.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  testCaseGetRequiredParameters: (
    requiredPathItemPathParam: string,
    body: SimpleTestEntity | undefined,
    queryParameters: {
      requiredPathItemQueryParam: string;
      optionalQueryParam?: string;
      requiredQueryParam: string;
      optionalPathItemQueryParam?: string;
    }
  ) =>
    new OpenApiRequestBuilder<any>(
      'get',
      '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}',
      {
        pathParameters: { requiredPathItemPathParam },
        body,
        queryParameters
      }
    ),
  /**
   * Create a request builder for execution of post requests to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint.
   * @param requiredPathItemPathParam Path parameter.
   * @param body -  Request body.
   * @param queryParameters -  Object containing the following keys: optionalPathItemQueryParam, requiredPathItemQueryParam, optionalQueryParam, requiredQueryParam.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  testCasePostRequiredParameters: (
    requiredPathItemPathParam: string,
    body: SimpleTestEntity,
    queryParameters: {
      optionalPathItemQueryParam?: string;
      requiredPathItemQueryParam: string;
      optionalQueryParam?: string;
      requiredQueryParam: string;
    }
  ) =>
    new OpenApiRequestBuilder<any>(
      'post',
      '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}',
      {
        pathParameters: { requiredPathItemPathParam },
        body,
        queryParameters
      }
    ),
  /**
   * Create a request builder for execution of get requests to the '/test-cases/parameters/{duplicateParam}' endpoint.
   * @param duplicateParam Path parameter.
   * @param queryParameters -  Object containing the following keys: duplicateParam.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  testCaseGetDuplicateParameters: (
    duplicateParam: string,
    queryParameters: { duplicateParam: string }
  ) =>
    new OpenApiRequestBuilder<any>(
      'get',
      '/test-cases/parameters/{duplicateParam}',
      {
        pathParameters: { duplicateParam },
        queryParameters
      }
    ),
  /**
   * Create a request builder for execution of get requests to the '/test-cases/duplicate-operation-ids' endpoint.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  duplicateOperationId: () =>
    new OpenApiRequestBuilder<any>(
      'get',
      '/test-cases/duplicate-operation-ids'
    ),
  /**
   * Create a request builder for execution of put requests to the '/test-cases/duplicate-operation-ids' endpoint.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  duplicateOperationId1_1: () =>
    new OpenApiRequestBuilder<any>(
      'put',
      '/test-cases/duplicate-operation-ids'
    ),
  /**
   * Create a request builder for execution of post requests to the '/test-cases/duplicate-operation-ids' endpoint.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  duplicateOperationId_1: () =>
    new OpenApiRequestBuilder<any>(
      'post',
      '/test-cases/duplicate-operation-ids'
    ),
  /**
   * Create a request builder for execution of patch requests to the '/test-cases/duplicate-operation-ids' endpoint.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  duplicateOperationId1: () =>
    new OpenApiRequestBuilder<any>(
      'patch',
      '/test-cases/duplicate-operation-ids'
    ),
  /**
   * Create a request builder for execution of get requests to the '/test-cases/reserved-keywords/{const1}' endpoint.
   * @param const1 Path parameter.
   * @param queryParameters -  Object containing the following keys: const.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  export: (const1: string, queryParameters: { const: string }) =>
    new OpenApiRequestBuilder<any>(
      'get',
      '/test-cases/reserved-keywords/{const1}',
      {
        pathParameters: { const1 },
        queryParameters
      }
    ),
  /**
   * Create a request builder for execution of get requests to the '/test-cases/complex-schemas' endpoint.
   * @param body -  Request body.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  complexSchemas: (body: ComplexTestEntity | undefined) =>
    new OpenApiRequestBuilder<any>('get', '/test-cases/complex-schemas', {
      body
    }),
  /**
   * Create a request builder for execution of post requests to the '/test-cases/complex-schemas' endpoint.
   * @param body -  Request body.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  useNameWithSymbols: (body: SimpleTestEntityWITHSymbols | undefined) =>
    new OpenApiRequestBuilder<any>('post', '/test-cases/complex-schemas', {
      body
    }),
  /**
   * Create a request builder for execution of get requests to the '/test-cases/schema-name-integer' endpoint.
   * @param body -  Request body.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  schemaNameInteger: (body: Schema123456 | undefined) =>
    new OpenApiRequestBuilder<any>('get', '/test-cases/schema-name-integer', {
      body
    }),
  /**
   * Create a request builder for execution of get requests to the '/test-cases/no-operation-id' endpoint.
   * @returns OpenApiRequestBuilder Use the execute() method to trigger the request.
   */
  getTestCasesNoOperationId: () =>
    new OpenApiRequestBuilder<any>('get', '/test-cases/no-operation-id')
};
