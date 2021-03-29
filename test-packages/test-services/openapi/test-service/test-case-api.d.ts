import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { SimpleTestEntity, ComplexTestEntity } from './schema';
/**
 * Representation of the TestCaseApi API.
 * This API is part of the TestService service.
 *
 * This API client has been created automatically using the SAP Cloud SDK - do not edit manually.
*/
export declare const TestCaseApi: {
    /**
     * Makes a get request to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint and returns a 'any'
     *
     * @param requiredPathItemPathParam Path parameter number 1
     * @param body Optional object containing the request body of type 'SimpleTestEntity'
     * @param queryParameters Optional object containing the query parameters.
     * @returns any
    */
    testCaseGetRequiredParameters: (requiredPathItemPathParam: string, body: SimpleTestEntity | undefined, queryParameters: {
        'requiredPathItemQueryParam': string;
        'optionalQueryParam'?: string;
        'requiredQueryParam': string;
        'optionalPathItemQueryParam'?: string;
    }) => OpenApiRequestBuilder<any>;
    /**
     * Makes a post request to the '/test-cases/parameters/required-parameters/{requiredPathItemPathParam}' endpoint and returns a 'any'
     *
     * @param requiredPathItemPathParam Path parameter number 1
     * @param body Object containing the request body of type 'SimpleTestEntity'
     * @param queryParameters Optional object containing the query parameters.
     * @returns any
    */
    testCasePostRequiredParameters: (requiredPathItemPathParam: string, body: SimpleTestEntity, queryParameters: {
        'optionalPathItemQueryParam'?: string;
        'requiredPathItemQueryParam': string;
        'optionalQueryParam'?: string;
        'requiredQueryParam': string;
    }) => OpenApiRequestBuilder<any>;
    /**
     * Makes a get request to the '/test-cases/parameters/{duplicateParam}' endpoint and returns a 'any'
     *
     * @param duplicateParam Path parameter number 1
     * @param queryParameters Optional object containing the query parameters.
     * @returns any
    */
    testCaseGetDuplicateParameters: (duplicateParam: string, queryParameters: {
        'duplicateParam': string;
    }) => OpenApiRequestBuilder<any>;
    /**
     * Makes a get request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
     *
     * @returns any
    */
    duplicateOperationId: () => OpenApiRequestBuilder<any>;
    /**
     * Makes a patch request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
     *
     * @returns any
    */
    duplicateOperationId1: () => OpenApiRequestBuilder<any>;
    /**
     * Makes a get request to the '/test-cases/reserved-keywords/{const1}' endpoint and returns a 'any'
     *
     * @param const1 Path parameter number 1
     * @param queryParameters Optional object containing the query parameters.
     * @returns any
    */
    export: (const1: string, queryParameters: {
        'const': string;
    }) => OpenApiRequestBuilder<any>;
    /**
     * Makes a get request to the '/test-cases/complex-schemas' endpoint and returns a 'any'
     *
     * @param body Optional object containing the request body of type 'ComplexTestEntity'
     * @returns any
    */
    complexSchemas: (body: ComplexTestEntity | undefined) => OpenApiRequestBuilder<any>;
    /**
     * Makes a get request to the '/test-cases/no-operation-id' endpoint and returns a 'any'
     *
     * @returns any
    */
    getTestCasesNoOperationId: () => OpenApiRequestBuilder<any>;
    /**
     * Makes a put request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
     *
     * @returns any
    */
    duplicateOperationId2: () => OpenApiRequestBuilder<any>;
    /**
     * Makes a post request to the '/test-cases/duplicate-operation-ids' endpoint and returns a 'any'
     *
     * @returns any
    */
    duplicateOperationId3: () => OpenApiRequestBuilder<any>;
};
//# sourceMappingURL=test-case-api.d.ts.map