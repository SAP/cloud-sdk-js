'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestCaseApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
/**
 * Representation of the 'TestCaseApi'.
 * This API is part of the 'TestService' service.
 */
exports.TestCaseApi = {
  /**
   * Makes a get request to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint and returns a 'any'
   *
   * @param requiredPathItemPathParam Path parameter with the original name requiredPathItemPathParam
   * @param body Request body
   * @param queryParameters Object containing the query parameters.
   * @returns any
   */
  testCaseGetRequiredParameters: function (
    requiredPathItemPathParam,
    body,
    queryParameters
  ) {
    return new core_1.OpenApiRequestBuilder(
      'get',
      '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}',
      {
        pathParameters: {
          requiredPathItemPathParam: requiredPathItemPathParam
        },
        body: body,
        queryParameters: queryParameters
      }
    );
  },
  /**
   * Makes a post request to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint and returns a 'any'
   *
   * @param requiredPathItemPathParam Path parameter with the original name requiredPathItemPathParam
   * @param body Request body
   * @param queryParameters Object containing the query parameters.
   * @returns any
   */
  testCasePostRequiredParameters: function (
    requiredPathItemPathParam,
    body,
    queryParameters
  ) {
    return new core_1.OpenApiRequestBuilder(
      'post',
      '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}',
      {
        pathParameters: {
          requiredPathItemPathParam: requiredPathItemPathParam
        },
        body: body,
        queryParameters: queryParameters
      }
    );
  },
  /**
   * Makes a get request to the '/test-cases/parameters/{duplicateParam}' endpoint and returns a 'any'
   *
   * @param duplicateParam Path parameter with the original name duplicateParam
   * @param queryParameters Object containing the query parameters.
   * @returns any
   */
  testCaseGetDuplicateParameters: function (duplicateParam, queryParameters) {
    return new core_1.OpenApiRequestBuilder(
      'get',
      '/test-cases/parameters/{duplicateParam}',
      {
        pathParameters: { duplicateParam: duplicateParam },
        queryParameters: queryParameters
      }
    );
  },
  /**
   * Makes a get request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
   *
   * @returns any
   */
  duplicateOperationId: function () {
    return new core_1.OpenApiRequestBuilder(
      'get',
      '/test-cases/duplicate-operation-ids'
    );
  },
  /**
   * Makes a put request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
   *
   * @returns any
   */
  duplicateOperationId2: function () {
    return new core_1.OpenApiRequestBuilder(
      'put',
      '/test-cases/duplicate-operation-ids'
    );
  },
  /**
   * Makes a post request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
   *
   * @returns any
   */
  duplicateOperationId3: function () {
    return new core_1.OpenApiRequestBuilder(
      'post',
      '/test-cases/duplicate-operation-ids'
    );
  },
  /**
   * Makes a patch request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
   *
   * @returns any
   */
  duplicateOperationId1: function () {
    return new core_1.OpenApiRequestBuilder(
      'patch',
      '/test-cases/duplicate-operation-ids'
    );
  },
  /**
   * Makes a get request to the '/test-cases/reserved-keywords/{const1}' endpoint and returns a 'any'
   *
   * @param const1 Path parameter with the original name const
   * @param queryParameters Object containing the query parameters.
   * @returns any
   */
  export: function (const1, queryParameters) {
    return new core_1.OpenApiRequestBuilder(
      'get',
      '/test-cases/reserved-keywords/{const1}',
      {
        pathParameters: { const1: const1 },
        queryParameters: queryParameters
      }
    );
  },
  /**
   * Makes a get request to the '/test-cases/complex-schemas' endpoint and returns a 'any'
   *
   * @param body Request body
   * @returns any
   */
  complexSchemas: function (body) {
    return new core_1.OpenApiRequestBuilder(
      'get',
      '/test-cases/complex-schemas',
      {
        body: body
      }
    );
  },
  /**
   * Makes a get request to the '/test-cases/no-operation-id' endpoint and returns a 'any'
   *
   * @returns any
   */
  getTestCasesNoOperationId: function () {
    return new core_1.OpenApiRequestBuilder(
      'get',
      '/test-cases/no-operation-id'
    );
  }
};
//# sourceMappingURL=test-case-api.js.map
