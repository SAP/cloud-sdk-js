import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { DefaultApi } from './openapi/api';
import { TestEntity, SimpleTestEntity } from './openapi/model';
export declare const TestServiceApi: {
    getAllEntities: (args?: {
        stringParameter?: string | undefined;
        integerParameter?: number | undefined;
        dollarParameter?: string | undefined;
        dotParameter?: string | undefined;
        enumStringParameter?: "value1" | "value2" | undefined;
        enumInt32Parameter?: 1 | 2 | undefined;
        enumDoubleParameter?: 1 | 2 | undefined;
        enumBooleanParameter?: boolean | undefined;
    } | undefined) => OpenApiRequestBuilder<DefaultApi, "getAllEntities">;
    updateEntityWithPut: (args?: {
        body?: TestEntity[] | undefined;
    } | undefined) => OpenApiRequestBuilder<DefaultApi, "updateEntityWithPut">;
    createEntity: (args?: {
        body?: TestEntity | undefined;
    } | undefined) => OpenApiRequestBuilder<DefaultApi, "createEntity">;
    updateEntity: (args?: {
        body?: Record<string, any> | undefined;
    } | undefined) => OpenApiRequestBuilder<DefaultApi, "updateEntity">;
    deleteEntity: (args?: {
        body?: string[] | undefined;
    } | undefined) => OpenApiRequestBuilder<DefaultApi, "deleteEntity">;
    getEntityByKey: (args: {
        entityId: string;
    }) => OpenApiRequestBuilder<DefaultApi, "getEntityByKey">;
    countEntities: () => OpenApiRequestBuilder<DefaultApi, "countEntities">;
    testCaseGetRequiredParameters: (args: {
        requiredPathItemQueryParam: string;
        requiredPathItemPathParam: string;
        requiredQueryParam: string;
        optionalQueryParam?: string;
        optionalPathItemQueryParam?: string;
        body?: SimpleTestEntity;
    }) => OpenApiRequestBuilder<DefaultApi, "testCaseGetRequiredParameters">;
    testCasePostRequiredParameters: (args: {
        requiredPathItemQueryParam: string;
        requiredPathItemPathParam: string;
        requiredQueryParam: string;
        body: SimpleTestEntity;
        optionalPathItemQueryParam?: string;
        optionalQueryParam?: string;
    }) => OpenApiRequestBuilder<DefaultApi, "testCasePostRequiredParameters">;
    testCaseGetDuplicateParameters: (args: {
        duplicateParam: string;
        duplicateParam2: string;
    }) => OpenApiRequestBuilder<DefaultApi, "testCaseGetDuplicateParameters">;
    getTestCasesNoOperationId: () => OpenApiRequestBuilder<DefaultApi, "getTestCasesNoOperationId">;
    duplicateOperationId: () => OpenApiRequestBuilder<DefaultApi, "duplicateOperationId">;
    duplicateOperationId2: () => OpenApiRequestBuilder<DefaultApi, "duplicateOperationId2">;
    duplicateOperationId3: () => OpenApiRequestBuilder<DefaultApi, "duplicateOperationId3">;
    duplicateOperationId1: () => OpenApiRequestBuilder<DefaultApi, "duplicateOperationId1">;
};
//# sourceMappingURL=api.d.ts.map