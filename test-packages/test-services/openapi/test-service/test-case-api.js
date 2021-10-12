"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCaseApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
/**
 * Representation of the 'TestCaseApi'.
 * This API is part of the 'test-service' service.
 */
exports.TestCaseApi = {
    /**
     * Create a request builder for execution of get requests to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint.
     * @param requiredPathItemPathParam - Path parameter.
     * @param body - Request body.
     * @param queryParameters - Object containing the following keys: requiredPathItemQueryParam, optionalQueryParam, requiredQueryParam, optionalPathItemQueryParam.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    testCaseGetRequiredParameters: function (requiredPathItemPathParam, body, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}', {
        pathParameters: { requiredPathItemPathParam: requiredPathItemPathParam },
        body: body,
        queryParameters: queryParameters
    }); },
    /**
     * Create a request builder for execution of post requests to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint.
     * @param requiredPathItemPathParam - Path parameter.
     * @param body - Request body.
     * @param queryParameters - Object containing the following keys: optionalPathItemQueryParam, requiredPathItemQueryParam, optionalQueryParam, requiredQueryParam.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    testCasePostRequiredParameters: function (requiredPathItemPathParam, body, queryParameters) { return new core_1.OpenApiRequestBuilder('post', '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}', {
        pathParameters: { requiredPathItemPathParam: requiredPathItemPathParam },
        body: body,
        queryParameters: queryParameters
    }); },
    /**
     * Create a request builder for execution of get requests to the '/test-cases/parameters/{duplicateParam}' endpoint.
     * @param duplicateParam - Path parameter.
     * @param queryParameters - Object containing the following keys: duplicateParam.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    testCaseGetDuplicateParameters: function (duplicateParam, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/test-cases/parameters/{duplicateParam}', {
        pathParameters: { duplicateParam: duplicateParam },
        queryParameters: queryParameters
    }); },
    /**
     * Create a request builder for execution of get requests to the '/test-cases/duplicate-operation-ids' endpoint.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    duplicateOperationId: function () { return new core_1.OpenApiRequestBuilder('get', '/test-cases/duplicate-operation-ids'); },
    /**
     * Create a request builder for execution of put requests to the '/test-cases/duplicate-operation-ids' endpoint.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    duplicateOperationId1_1: function () { return new core_1.OpenApiRequestBuilder('put', '/test-cases/duplicate-operation-ids'); },
    /**
     * Create a request builder for execution of post requests to the '/test-cases/duplicate-operation-ids' endpoint.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    duplicateOperationId_1: function () { return new core_1.OpenApiRequestBuilder('post', '/test-cases/duplicate-operation-ids'); },
    /**
     * Create a request builder for execution of patch requests to the '/test-cases/duplicate-operation-ids' endpoint.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    duplicateOperationId1: function () { return new core_1.OpenApiRequestBuilder('patch', '/test-cases/duplicate-operation-ids'); },
    /**
     * Create a request builder for execution of get requests to the '/test-cases/reserved-keywords/{const1}' endpoint.
     * @param const1 - Path parameter.
     * @param queryParameters - Object containing the following keys: const.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    export: function (const1, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/test-cases/reserved-keywords/{const1}', {
        pathParameters: { const1: const1 },
        queryParameters: queryParameters
    }); },
    /**
     * Create a request builder for execution of get requests to the '/test-cases/complex-schemas' endpoint.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    complexSchemas: function (body) { return new core_1.OpenApiRequestBuilder('get', '/test-cases/complex-schemas', {
        body: body
    }); },
    /**
     * Create a request builder for execution of post requests to the '/test-cases/complex-schemas' endpoint.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    useNameWithSymbols: function (body) { return new core_1.OpenApiRequestBuilder('post', '/test-cases/complex-schemas', {
        body: body
    }); },
    /**
     * Create a request builder for execution of get requests to the '/test-cases/schema-name-integer' endpoint.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    schemaNameInteger: function (body) { return new core_1.OpenApiRequestBuilder('get', '/test-cases/schema-name-integer', {
        body: body
    }); },
    /**
     * Create a request builder for execution of get requests to the '/test-cases/no-operation-id' endpoint.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getTestCasesNoOperationId: function () { return new core_1.OpenApiRequestBuilder('get', '/test-cases/no-operation-id'); }
};
//# sourceMappingURL=test-case-api.js.map