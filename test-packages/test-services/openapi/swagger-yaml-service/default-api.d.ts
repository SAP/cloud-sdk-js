import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { TestEntity } from './schema';
/**
 * Representation of the 'DefaultApi'.
 * This API is part of the 'swagger-yaml-service' service.
 */
export declare const DefaultApi: {
    /**
     * Test POST
     * @param pathParam - Path parameter.
     * @param queryParameters - Object containing the following keys: queryParam.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    postEntity: (pathParam: string, queryParameters?: {
        queryParam?: string | undefined;
    } | undefined) => OpenApiRequestBuilder<TestEntity[]>;
    /**
     * Create a request builder for execution of patch requests to the '/entities/{pathParam}' endpoint.
     * @param pathParam - Path parameter.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    patchEntity: (pathParam: string, body: TestEntity | undefined) => OpenApiRequestBuilder<string>;
};
//# sourceMappingURL=default-api.d.ts.map