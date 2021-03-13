import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { TestEntity } from './model';
export declare const EntityApi: {
    getAllEntities: (queryParameters?: {
        stringParameter?: string | undefined;
        integerParameter?: number | undefined;
        $dollarParameter?: string | undefined;
        'dot.parameter'?: string | undefined;
        enumStringParameter?: "value1" | "value2" | undefined;
        enumInt32Parameter?: 1 | 2 | undefined;
        enumDoubleParameter?: 1 | 2 | undefined;
        enumBooleanParameter?: boolean | undefined;
    } | undefined) => OpenApiRequestBuilder;
    updateEntityWithPut: (body: TestEntity[], queryParameters?: {} | undefined) => OpenApiRequestBuilder;
    createEntity: (body: TestEntity, queryParameters?: {} | undefined) => OpenApiRequestBuilder;
    updateEntity: (body: Record<string, any>, queryParameters?: {} | undefined) => OpenApiRequestBuilder;
    deleteEntity: (body: string[], queryParameters?: {} | undefined) => OpenApiRequestBuilder;
    getEntityByKey: (entityId: string, queryParameters?: {} | undefined) => OpenApiRequestBuilder;
    countEntities: (queryParameters?: {} | undefined) => OpenApiRequestBuilder;
};
//# sourceMappingURL=entity-api.d.ts.map