import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { TestEntity } from './model';
export declare const DefaultApi: {
    postEntity: (pathParam: string, queryParameters?: {
        queryParam?: string | undefined;
    } | undefined) => OpenApiRequestBuilder<TestEntity[]>;
    patchEntity: (pathParam: string, body: TestEntity | undefined) => OpenApiRequestBuilder<string>;
};
//# sourceMappingURL=default-api.d.ts.map