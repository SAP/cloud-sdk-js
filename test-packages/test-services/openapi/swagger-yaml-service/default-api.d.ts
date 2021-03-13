import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { TestEntity } from './model';
export declare const DefaultApi: {
    postEntity: (pathParam: string, queryParameters?: {
        queryParam?: string | undefined;
    } | undefined) => OpenApiRequestBuilder;
    patchEntity: (pathParam: string, body: TestEntity, queryParameters?: {} | undefined) => OpenApiRequestBuilder;
};
//# sourceMappingURL=default-api.d.ts.map