"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'SecretApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.SecretApi = {
    /**
     * Lists all secrets corresponding to tenant. This retrieves metadata only, not the secret data itself.
     * @param queryParameters - Object containing the following keys: $top, $skip, $count.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4GenericSecretsGet: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/admin/secrets', {
        queryParameters
    }),
    /**
     * Create a new generic secret in the corresponding resource group or at main tenant level.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4GenericSecretsCreate: (body) => new openapi_1.OpenApiRequestBuilder('post', '/admin/secrets', {
        body
    }),
    /**
     * Update secret credentials. Replace secret data with the provided data.
     * @param secretName - Path parameter.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4GenericSecretsUpdate: (secretName, body) => new openapi_1.OpenApiRequestBuilder('patch', '/admin/secrets/{secretName}', {
        pathParameters: { secretName },
        body
    }),
    /**
     * Deletes the secret from provided resource group namespace
     * @param secretName - Path parameter.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4GenericSecretsDelete: (secretName) => new openapi_1.OpenApiRequestBuilder('delete', '/admin/secrets/{secretName}', {
        pathParameters: { secretName }
    })
};
//# sourceMappingURL=secret-api.js.map