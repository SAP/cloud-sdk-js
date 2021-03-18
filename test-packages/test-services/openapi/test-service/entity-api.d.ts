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
    updateEntityWithPut: (body: TestEntity[]) => OpenApiRequestBuilder;
    createEntity: (body: TestEntity) => OpenApiRequestBuilder;
    updateEntity: (body: Record<string, any>) => OpenApiRequestBuilder;
    deleteEntity: (body: string[]) => OpenApiRequestBuilder;
    getEntityByKey: (entityId: string) => OpenApiRequestBuilder;
    countEntities: () => OpenApiRequestBuilder;
};
//# sourceMappingURL=entity-api.d.ts.map