"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCaseApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'TestCaseApi'.
 * This API is part of the 'test-service' service.
 */
exports.TestCaseApi = {
    _defaultBasePath: undefined,
    /**
     * Create a request builder for execution of get requests to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint.
     * @param requiredPathItemPathParam - Path parameter.
     * @param body - Request body.
     * @param queryParameters - Object containing the following keys: requiredPathItemQueryParam, optionalQueryParam, requiredQueryParam, optionalPathItemQueryParam.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    testCaseGetRequiredParameters: (requiredPathItemPathParam, body, queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}', {
        pathParameters: { requiredPathItemPathParam },
        body,
        queryParameters
    }, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of post requests to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint.
     * @param requiredPathItemPathParam - Path parameter.
     * @param body - Request body.
     * @param queryParameters - Object containing the following keys: optionalPathItemQueryParam, requiredPathItemQueryParam, optionalQueryParam, requiredQueryParam.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    testCasePostRequiredParameters: (requiredPathItemPathParam, body, queryParameters) => new openapi_1.OpenApiRequestBuilder('post', '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}', {
        pathParameters: { requiredPathItemPathParam },
        body,
        queryParameters
    }, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of get requests to the '/test-cases/parameters' endpoint.
     * @param queryParameters - Object containing the following keys: requiredQueryParam.
     * @param headerParameters - Object containing the following keys: optionalHeaderParam.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    testCaseRequiredQueryOptionalHeader: (queryParameters, headerParameters) => new openapi_1.OpenApiRequestBuilder('get', '/test-cases/parameters', {
        queryParameters,
        headerParameters
    }, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of post requests to the '/test-cases/parameters' endpoint.
     * @param body - Request body.
     * @param queryParameters - Object containing the following keys: optionalQueryParam.
     * @param headerParameters - Object containing the following keys: requiredHeaderParam.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    testCaseOptionalQueryRequiredHeader: (body, queryParameters, headerParameters) => new openapi_1.OpenApiRequestBuilder('post', '/test-cases/parameters', {
        body,
        queryParameters,
        headerParameters
    }, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of patch requests to the '/test-cases/parameters' endpoint.
     * @param body - Request body.
     * @param queryParameters - Object containing the following keys: optionalQueryParam.
     * @param headerParameters - Object containing the following keys: optionalHeaderParam.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    testCaseOptionalQueryOptionalHeader: (body, queryParameters, headerParameters) => new openapi_1.OpenApiRequestBuilder('patch', '/test-cases/parameters', {
        body,
        queryParameters,
        headerParameters
    }, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of get requests to the '/test-cases/parameters/{duplicateParam}' endpoint.
     * @param duplicateParam - Path parameter.
     * @param queryParameters - Object containing the following keys: duplicateParam.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    testCaseGetDuplicateParameters: (duplicateParam, queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/test-cases/parameters/{duplicateParam}', {
        pathParameters: { duplicateParam },
        queryParameters
    }, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of get requests to the '/test-cases/duplicate-operation-ids' endpoint.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    duplicateOperationId: () => new openapi_1.OpenApiRequestBuilder('get', '/test-cases/duplicate-operation-ids', {}, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of put requests to the '/test-cases/duplicate-operation-ids' endpoint.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    duplicateOperationId1_1: () => new openapi_1.OpenApiRequestBuilder('put', '/test-cases/duplicate-operation-ids', {}, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of post requests to the '/test-cases/duplicate-operation-ids' endpoint.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    duplicateOperationId_1: () => new openapi_1.OpenApiRequestBuilder('post', '/test-cases/duplicate-operation-ids', {}, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of patch requests to the '/test-cases/duplicate-operation-ids' endpoint.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    duplicateOperationId1: () => new openapi_1.OpenApiRequestBuilder('patch', '/test-cases/duplicate-operation-ids', {}, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of get requests to the '/test-cases/reserved-keywords/{const1}' endpoint.
     * @param const1 - Path parameter.
     * @param queryParameters - Object containing the following keys: const.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    export: (const1, queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/test-cases/reserved-keywords/{const1}', {
        pathParameters: { const1 },
        queryParameters
    }, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of get requests to the '/test-cases/complex-schemas' endpoint.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    complexSchemas: (body) => new openapi_1.OpenApiRequestBuilder('get', '/test-cases/complex-schemas', {
        body
    }, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of post requests to the '/test-cases/complex-schemas' endpoint.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    useNameWithSymbols: (body) => new openapi_1.OpenApiRequestBuilder('post', '/test-cases/complex-schemas', {
        body
    }, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of get requests to the '/test-cases/schema-name-integer' endpoint.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    schemaNameInteger: (body) => new openapi_1.OpenApiRequestBuilder('get', '/test-cases/schema-name-integer', {
        body
    }, exports.TestCaseApi._defaultBasePath),
    /**
     * Create a request builder for execution of get requests to the '/test-cases/no-operation-id' endpoint.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getTestCasesNoOperationId: () => new openapi_1.OpenApiRequestBuilder('get', '/test-cases/no-operation-id', {}, exports.TestCaseApi._defaultBasePath)
};
//# sourceMappingURL=test-case-api.js.map