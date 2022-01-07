"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'DefaultApi'.
 * This API is part of the 'swagger-yaml-service' service.
 */
exports.DefaultApi = {
    /**
     * Test POST
     * @param pathParam - Path parameter.
     * @param queryParameters - Object containing the following keys: queryParam.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    postEntity: (pathParam, queryParameters) => new openapi_1.OpenApiRequestBuilder('post', '/entities/{pathParam}', {
        pathParameters: { pathParam },
        queryParameters
    }),
    /**
     * Create a request builder for execution of patch requests to the '/entities/{pathParam}' endpoint.
     * @param pathParam - Path parameter.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    patchEntity: (pathParam, body) => new openapi_1.OpenApiRequestBuilder('patch', '/entities/{pathParam}', {
        pathParameters: { pathParam },
        body
    })
};
//# sourceMappingURL=default-api.js.map