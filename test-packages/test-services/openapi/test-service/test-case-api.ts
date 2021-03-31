/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { SimpleTestEntity, ComplexTestEntity } from './schema';

/**
 * Representation of the 'TestCaseApi'.
 * This API is part of the 'TestService' service.
 */
export const TestCaseApi = {
  /**
   * Makes a get request to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint and returns a 'any'
   *
   * @param requiredPathItemPathParam Path parameter with the original name requiredPathItemPathParam
   * @param body Request body
   * @param queryParameters Object containing the query parameters.
   * @returns any
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
   * Makes a post request to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint and returns a 'any'
   *
   * @param requiredPathItemPathParam Path parameter with the original name requiredPathItemPathParam
   * @param body Request body
   * @param queryParameters Object containing the query parameters.
   * @returns any
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
   * Makes a get request to the '/test-cases/parameters/{duplicateParam}' endpoint and returns a 'any'
   *
   * @param duplicateParam Path parameter with the original name duplicateParam
   * @param queryParameters Object containing the query parameters.
   * @returns any
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
   * Makes a get request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
   *
   * @returns any
   */
  duplicateOperationId: () =>
    new OpenApiRequestBuilder<any>(
      'get',
      '/test-cases/duplicate-operation-ids'
    ),
  /**
   * Makes a put request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
   *
   * @returns any
   */
  duplicateOperationId2: () =>
    new OpenApiRequestBuilder<any>(
      'put',
      '/test-cases/duplicate-operation-ids'
    ),
  /**
   * Makes a post request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
   *
   * @returns any
   */
  duplicateOperationId3: () =>
    new OpenApiRequestBuilder<any>(
      'post',
      '/test-cases/duplicate-operation-ids'
    ),
  /**
   * Makes a patch request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
   *
   * @returns any
   */
  duplicateOperationId1: () =>
    new OpenApiRequestBuilder<any>(
      'patch',
      '/test-cases/duplicate-operation-ids'
    ),
  /**
   * Makes a get request to the '/test-cases/reserved-keywords/{const1}' endpoint and returns a 'any'
   *
   * @param const1 Path parameter with the original name const
   * @param queryParameters Object containing the query parameters.
   * @returns any
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
   * Makes a get request to the '/test-cases/complex-schemas' endpoint and returns a 'any'
   *
   * @param body Request body
   * @returns any
   */
  complexSchemas: (body: ComplexTestEntity | undefined) =>
    new OpenApiRequestBuilder<any>('get', '/test-cases/complex-schemas', {
      body
    }),
  /**
   * Makes a get request to the '/test-cases/no-operation-id' endpoint and returns a 'any'
   *
   * @returns any
   */
  getTestCasesNoOperationId: () =>
    new OpenApiRequestBuilder<any>('get', '/test-cases/no-operation-id')
};
