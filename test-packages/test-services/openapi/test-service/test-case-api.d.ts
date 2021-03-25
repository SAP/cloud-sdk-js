import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { TestCaseApi } from './openapi/api';
import { SimpleTestEntity } from './openapi/model';
export declare const TestServiceTestCaseApi: {
  testCaseGetRequiredParameters: (args: {
    requiredPathItemQueryParam: string;
    requiredPathItemPathParam: string;
    requiredQueryParam: string;
    optionalQueryParam?: string;
    optionalPathItemQueryParam?: string;
    body?: SimpleTestEntity;
  }) => OpenApiRequestBuilder<TestCaseApi, 'testCaseGetRequiredParameters'>;
  testCasePostRequiredParameters: (args: {
    requiredPathItemQueryParam: string;
    requiredPathItemPathParam: string;
    requiredQueryParam: string;
    body: SimpleTestEntity;
    optionalPathItemQueryParam?: string;
    optionalQueryParam?: string;
  }) => OpenApiRequestBuilder<TestCaseApi, 'testCasePostRequiredParameters'>;
  testCaseGetDuplicateParameters: (args: {
    duplicateParam: string;
    duplicateParam2: string;
  }) => OpenApiRequestBuilder<TestCaseApi, 'testCaseGetDuplicateParameters'>;
  getTestCasesNoOperationId: () => OpenApiRequestBuilder<
    TestCaseApi,
    'getTestCasesNoOperationId'
  >;
  duplicateOperationId: () => OpenApiRequestBuilder<
    TestCaseApi,
    'duplicateOperationId'
  >;
  duplicateOperationId2: () => OpenApiRequestBuilder<
    TestCaseApi,
    'duplicateOperationId2'
  >;
  duplicateOperationId3: () => OpenApiRequestBuilder<
    TestCaseApi,
    'duplicateOperationId3'
  >;
  duplicateOperationId1: () => OpenApiRequestBuilder<
    TestCaseApi,
    'duplicateOperationId1'
  >;
};
//# sourceMappingURL=test-case-api.d.ts.map
