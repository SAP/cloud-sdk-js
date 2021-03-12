import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { SimpleTestEntity, ComplexTestEntity } from './model';
export declare const TestServiceTestCaseApi: {
    testCaseGetRequiredParameters: (requiredPathItemPathParam: string, body: SimpleTestEntity, queryParameters: {
        'requiredPathItemQueryParam': string;
        'optionalQueryParam'?: string;
        'requiredQueryParam': string;
        'optionalPathItemQueryParam'?: string;
    }) => OpenApiRequestBuilder;
    testCasePostRequiredParameters: (requiredPathItemPathParam: string, body: SimpleTestEntity | undefined, queryParameters: {
        'optionalPathItemQueryParam'?: string;
        'requiredPathItemQueryParam': string;
        'optionalQueryParam'?: string;
        'requiredQueryParam': string;
    }) => OpenApiRequestBuilder;
    testCaseGetDuplicateParameters: (duplicateParam: string, queryParameters: {
        'duplicateParam': string;
    }) => OpenApiRequestBuilder;
    getTestCasesNoOperationId: (queryParameters?: {} | undefined) => OpenApiRequestBuilder;
    duplicateOperationId: (queryParameters?: {} | undefined) => OpenApiRequestBuilder;
    duplicateOperationId2: (queryParameters?: {} | undefined) => OpenApiRequestBuilder;
    duplicateOperationId3: (queryParameters?: {} | undefined) => OpenApiRequestBuilder;
    duplicateOperationId1: (queryParameters?: {} | undefined) => OpenApiRequestBuilder;
    complexSchemas: (body: ComplexTestEntity, queryParameters?: {} | undefined) => OpenApiRequestBuilder;
};
//# sourceMappingURL=test-case-api.d.ts.map