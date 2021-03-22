import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { SimpleTestEntity, ComplexTestEntity } from './model';
export declare const TestCaseApi: {
    testCaseGetRequiredParameters: (requiredPathItemPathParam: string, body: SimpleTestEntity | undefined, queryParameters: {
        'requiredPathItemQueryParam': string;
        'optionalQueryParam'?: string;
        'requiredQueryParam': string;
        'optionalPathItemQueryParam'?: string;
    }) => OpenApiRequestBuilder;
    testCasePostRequiredParameters: (requiredPathItemPathParam: string, body: SimpleTestEntity, queryParameters: {
        'optionalPathItemQueryParam'?: string;
        'requiredPathItemQueryParam': string;
        'optionalQueryParam'?: string;
        'requiredQueryParam': string;
    }) => OpenApiRequestBuilder;
    testCaseGetDuplicateParameters: (duplicateParam: string, queryParameters: {
        'duplicateParam': string;
    }) => OpenApiRequestBuilder;
    duplicateOperationId: () => OpenApiRequestBuilder;
    duplicateOperationId1: () => OpenApiRequestBuilder;
    complexSchemas: (body: ComplexTestEntity | undefined) => OpenApiRequestBuilder;
    getTestCasesNoOperationId: () => OpenApiRequestBuilder;
    duplicateOperationId2: () => OpenApiRequestBuilder;
    duplicateOperationId3: () => OpenApiRequestBuilder;
};
//# sourceMappingURL=test-case-api.d.ts.map