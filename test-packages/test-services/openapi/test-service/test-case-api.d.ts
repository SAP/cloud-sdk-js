import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { SimpleTestEntity, ComplexTestEntity } from './schema';
export declare const TestCaseApi: {
    testCaseGetRequiredParameters: (requiredPathItemPathParam: string, body: SimpleTestEntity | undefined, queryParameters: {
        'requiredPathItemQueryParam': string;
        'optionalQueryParam'?: string;
        'requiredQueryParam': string;
        'optionalPathItemQueryParam'?: string;
    }) => OpenApiRequestBuilder<any>;
    testCasePostRequiredParameters: (requiredPathItemPathParam: string, body: SimpleTestEntity, queryParameters: {
        'optionalPathItemQueryParam'?: string;
        'requiredPathItemQueryParam': string;
        'optionalQueryParam'?: string;
        'requiredQueryParam': string;
    }) => OpenApiRequestBuilder<any>;
    testCaseGetDuplicateParameters: (duplicateParam: string, queryParameters: {
        'duplicateParam': string;
    }) => OpenApiRequestBuilder<any>;
    duplicateOperationId: () => OpenApiRequestBuilder<any>;
    duplicateOperationId1: () => OpenApiRequestBuilder<any>;
    complexSchemas: (body: ComplexTestEntity | undefined) => OpenApiRequestBuilder<any>;
    getTestCasesNoOperationId: () => OpenApiRequestBuilder<any>;
    duplicateOperationId2: () => OpenApiRequestBuilder<any>;
    duplicateOperationId3: () => OpenApiRequestBuilder<any>;
};
//# sourceMappingURL=test-case-api.d.ts.map