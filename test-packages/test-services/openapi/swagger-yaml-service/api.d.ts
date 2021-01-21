import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { DefaultApi } from './openapi/api';
import { TestEntity } from './openapi/model';
export declare const SwaggerYamlServiceApi: {
    postEntity: (args: {
        pathParam: string;
        queryParam?: string;
    }) => OpenApiRequestBuilder<DefaultApi, "postEntity">;
    patchEntity: (args: {
        pathParam: string;
        body?: TestEntity;
    }) => OpenApiRequestBuilder<DefaultApi, "patchEntity">;
};
//# sourceMappingURL=api.d.ts.map