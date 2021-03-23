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
    } | undefined) => OpenApiRequestBuilder<TestEntity[]>;
    updateEntityWithPut: (body: TestEntity[] | undefined) => OpenApiRequestBuilder<any>;
    createEntity: (body: TestEntity | undefined) => OpenApiRequestBuilder<any>;
    updateEntity: (body: Record<string, any> | undefined) => OpenApiRequestBuilder<any>;
    deleteEntity: (body: string[] | undefined) => OpenApiRequestBuilder<any>;
    getEntityByKey: (entityId: string) => OpenApiRequestBuilder<any>;
    countEntities: () => OpenApiRequestBuilder<number>;
};
//# sourceMappingURL=entity-api.d.ts.map